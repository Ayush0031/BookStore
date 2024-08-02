import { addToCart, deleteCartItem, fetchCart } from "../controller/cart.controller.js";
import express from 'express'

const router=express.Router();

router.post("/create",addToCart)
router.post("/deleteitem",deleteCartItem)
router.get("/:userId",fetchCart)
export default router;