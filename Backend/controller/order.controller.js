import Cart from "../models/cart.model.js";
import Order from "../models/order.model.js";
import Stripe from 'stripe';
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
        const{userId}=req.body;
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
export {createPaymentIntent,createOrder,viewOrder}