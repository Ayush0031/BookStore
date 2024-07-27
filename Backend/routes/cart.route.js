import { addToCart, fetchCart } from "../controller/cart.controller.js";
import express from 'express'

const router=express.Router();

router.post("/create",addToCart)
router.get("/:userId",fetchCart)
export default router;