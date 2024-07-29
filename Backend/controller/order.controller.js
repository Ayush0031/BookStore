import Cart from "../models/cart.model.js";
import Order from "../models/order.model.js";
import Stripe from 'stripe'
const createOrder = async(req,res)=>{
    const stripe=new Stripe(process.env.STRIPE_SECRET_KEY)
    const{userId,address,stripeToken}=req.body;
    try {
        const cart = await Cart.findOne({userId}).populate('items.bookId');
        if(!cart){
            res.status(404).json({message:"Cart not found"});
        }
        const items= cart.items.map(item=>({
            bookId:item.bookId._id,
            quantity:item.quantity,
            price:item.bookId.price

        }))
        const totalPrice = items.reduce((sum,item)=>sum+item.price*item.quantity,0)
        const charge = await stripe.charges.create({
            amount: totalPrice * 100, // Stripe amounts are in cents
            currency: 'usd',
            source: stripeToken,
            description: `Order for ${userId}`
        });

        if(!charge){
            return res.status(500).json({message:"Payment Failed"});
        }

        const newOrder= new Order({
            userId,
            items,
            totalPrice,
            address,
            status:paid
        })
        await newOrder.save();
        cart.items=[];
        await cart.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

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
export {createOrder,viewOrder}