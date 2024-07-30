import express from 'express'
import { createOrder, createPaymentIntent, viewOrder } from '../controller/order.controller.js';

const router=express.Router()
router.post("/create",createOrder)
router.post("/payment-intents",createPaymentIntent)
router.get("/view/:userId",viewOrder)
export default router;
