import Book from "../models/book.model.js";
import Cart from "../models/cart.model.js";

const addToCart= async(req,res)=>{
    const {userId,bookId,quantity}=req.body;
    try {
        let cart = await Cart.findOne({userId});
        if(!cart){
            cart=new Cart({userId,items:[]});
        }

        const book = await Book.findById(bookId);
        if(!book){
            res.status(404).json({message:"Book Not Found"})
        }

        const existingItems=cart.items.find(item=>item.bookId.equals(bookId));
        if(existingItems){
            existingItems.quantity+=quantity;
        }
        else{
            cart.items.push({bookId,quantity})
        }

        cart.updatedAt=Date.now();
        await cart.save();
        
        res.status(200).json(cart)
    } catch (error) {
        res.status(500).json({message:error.message})
    }

}
const deleteCartItem=async(req,res)=>{
    try {
        const {userId,itemId}=req.body;
    let cart=await Cart.findOne({userId});
    if(!cart){
        return res.status(404).json({message:"cart not found"})
    }
    cart.items= cart.items.filter(item=>!item._id.equals(itemId))

    cart.updatedAt=Date.now();
        await cart.save();
        
        res.status(200).json(cart)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
    

}
const fetchCart= async(req,res)=>{
        const{userId}=req.params;
        try {
            const cart= await Cart.findOne({userId}).populate('items.bookId')
            if(!cart){
               return  res.status(404).json({message:"Cart Not Found"})
            }
            res.status(200).json(cart)
        } catch (error) {
            res.status(500).json({message:error.message})
        }
}
export {addToCart,fetchCart,deleteCartItem}