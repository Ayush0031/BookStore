import Cart from "../models/cart.model.js";
import Order from "../models/order.model.js";
import Stripe from 'stripe';
import PDFDocument from 'pdfkit';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const createPaymentIntent = async (req, res) => {
    const { userId, address } = req.body;
    const stripe=new Stripe(process.env.STRIPE_SECRET_KEY)
    try {
        const cart = await Cart.findOne({ userId }).populate('items.bookId');
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const items = cart.items.map(item => ({
            bookId: item.bookId._id,
            quantity: item.quantity,
            price: item.bookId.price
        }));

        const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

        // Create a Payment Intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalPrice * 100, // Stripe amounts are in cents
            currency: 'usd',
            description: `Order for ${userId}`,
        });

        res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createOrder = async (req, res) => {
    const { userId, address, paymentIntentId } = req.body;
    const stripe=new Stripe(process.env.STRIPE_SECRET_KEY)
    try {
        const cart = await Cart.findOne({ userId }).populate('items.bookId');
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const items = cart.items.map(item => ({
            bookId: item.bookId._id,
            quantity: item.quantity,
            price: item.bookId.price
        }));

        const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

        // Confirm the Payment Intent
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
        if (paymentIntent.status !== 'succeeded') {
            return res.status(400).json({ message: 'Payment not successful' });
        }

        const newOrder = new Order({
            userId,
            items,
            totalPrice,
            address,
            status: 'Paid'
        });

        await newOrder.save();

        // Clear the cart
        cart.items = [];
        await cart.save();

        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const viewOrder = async(req,res)=>{
        const{userId}=req.params;
        try {
            const order=await Order.find({userId}).populate('items.bookId');

            if(!order){
                res.status(404).json({message:"No Orders Placed Yet"})
    }
        res.status(200).json(order)
            } catch (error) {
    res.status(500).json({message:error.message})
}
}
const generateReceipt=async(req,res)=>{
    try {
        const _id = req.params.orderId;
        console.log(`Generating receipt for order ID: ${_id}`);
    
        const order = await Order.findById(_id);
    
        if (!order) {
          console.error('Order not found');
          return res.status(404).json({ message: 'Order not found' });
        }
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="receipt-${_id}.pdf"`);
        const doc = new PDFDocument();
        doc.pipe(res);
        doc.fontSize(40).text('The bookStore', { align: 'center',color:"pink-500" });
        doc.fontSize(20).text('Order Receipt', { align: 'center' });
        doc.fontSize(14).text(`Order ID: ${order._id}`);
        doc.text(`User ID: ${order.userId}`);
        doc.text(`Date: ${order.createdAt.toDateString()}`);
        doc.moveDown();
    
        order.items.forEach(item => {
          doc.text(`Item: ${item.name}`);
          doc.text(`Price: $${item.price}`);
          doc.text(`Quantity: ${item.quantity}`);
          doc.moveDown();
        });
    
        doc.text(`Total Amount: $${order.totalPrice}`, { align: 'right' });
        doc.end();
    
        
      } catch (error) {
        console.error('Error generating receipt:', error);
        res.status(500).json({ message: 'Error generating receipt' });
      }
    }
   

export {createPaymentIntent,createOrder,viewOrder,generateReceipt}