import mongoose, { mongo } from 'mongoose'
import Book from './book.model'
import model from './user.model'

const cartSchema=mongoose.Schema({
    book:Book,
    user:model,
    qty:Number,
    price:Number
})

const Cart=mongoose.model("cart",cartSchema);
export default Cart;