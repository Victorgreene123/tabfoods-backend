import { Router } from "express";
import initiatePayment from "../controllers/initiatePayment.js";


const payment = Router();

payment.route('/initiate').post(initiatePayment)

export default payment
