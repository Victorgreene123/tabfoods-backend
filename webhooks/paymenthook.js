import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import ordermodel from './models/order.js'; // adjust the path as needed

dotenv.config();

const app = express();
app.use(bodyParser.json());

const FLW_SECRET_HASH = process.env.FLW_SECRET_HASH;

// Webhook route
app.post('/flw-webhook', async (req, res) => {
    try {
        const signature = req.headers['verif-hash'];
        if (!signature || signature !== FLW_SECRET_HASH) {
            console.log('❌ Invalid webhook signature');
            return res.status(401).send('Unauthorized');
        }

        const payload = req.body;
        const txRef = payload.data.tx_ref;
        const status = payload.data.status;

        console.log('✅ Received webhook payload:', payload);

        // Extract order reference from tx_ref
        // You must save the tx_ref (transaction reference) into the Order when initiating payment
        // Example: tx_ref: `order-${orderId}-${Date.now()}`

        const orderId = txRef.split('-')[1]; // assuming tx_ref = order-<orderId>-<timestamp>

        const order = await ordermodel.findById(orderId);

        if (!order) {
            console.log(`❌ Order not found for tx_ref: ${txRef}`);
            return res.status(404).send('Order not found');
        }

        // Prevent duplicate updates
        if (order.status === 'paid') {
            console.log(`⚠️ Order already marked as paid: ${orderId}`);
            return res.status(200).send('Already processed');
        }

        if (status === 'successful') {
            order.status = 'paid';
            order.amount = payload.data.amount;
            await order.save();

            console.log(`✅ Order updated to paid: ${orderId}`);
        } else {
            console.log(`ℹ️ Payment not successful for order: ${orderId}`);
        }

        res.status(200).send('Webhook processed');
    } catch (err) {
        console.error('❌ Error in webhook handler:', err);
        res.status(500).send('Internal Server Error');
    }
});
