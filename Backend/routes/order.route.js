import express from 'express'
import { createOrder, createPaymentIntent, generateReceipt, viewOrder } from '../controller/order.controller.js';

const router=express.Router()
router.post("/create",createOrder)
router.post("/payment-intents",createPaymentIntent)
router.get("/view/:userId",viewOrder)
router.get("/receipt/:orderId",generateReceipt)
export default router;
