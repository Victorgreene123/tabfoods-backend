import express from 'express';
import { addOrder, cancelOrder, getAllOrders, updateOrder } from '../controllers/order.js';

// Create a new order
const orderrouter = express.Router();
orderrouter.post('/', addOrder);

// Get all orders
orderrouter.get('/', getAllOrders);

// Get a specific order by ID


// Update an order by ID
orderrouter.put('/:orderId', updateOrder);

export default orderrouter;