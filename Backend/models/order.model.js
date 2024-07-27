import mongoose, { mongo } from "mongoose";
import Book from "./book.model.js";


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
    address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zip: { type: String, required: true },
        country: { type: String, required: true }
    },
    status: { type: String, default: 'Pending' },
    createdAt: { type: Date, default: Date.now }
})

const Order=mongoose.model("Order",orderSchema)
export default Order