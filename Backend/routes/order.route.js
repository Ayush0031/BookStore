import express from 'express'
import { createOrder, viewOrder } from '../controller/order.controller.js';

const router=express.Router()
router.post("/create",createOrder)
router.get("/view",viewOrder)
export default router;
