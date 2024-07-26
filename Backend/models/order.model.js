import mongoose, { mongo } from "mongoose";
import Book from "./book.model";


const orderSchema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    items: [{
        bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }
    }],
    totalPrice:{
        type:Number,
        required:true
    },
    status: { type: String, default: 'Pending' },
    createdAt: { type: Date, default: Date.now }
})

const Order=mongoose.model("Order",orderSchema)
export default Order