import axios from 'axios';
import dotenv from 'dotenv';
import ordermodel from '../models/orders.js'; // adjust this import path as needed

dotenv.config();

const initiatePayment = async (req, res) => {
  const { amount, currency, email, phone, name, address, productsDetail } = req.body;

  try {
    // Step 1: Create a new Order in DB
    const newOrder = new ordermodel({
      fullname: name,
      email,
      phone,
      address,
      productsDetail,
      amount,
      status: 'pending',
    });

    const savedOrder = await newOrder.save();

    // Step 2: Create tx_ref with orderId
    const tx_ref = `order-${savedOrder._id}-${Date.now()}`;

    // Step 3: Initiate Flutterwave payment
    const response = await axios.post(
      'https://api.flutterwave.com/v3/payments',
      {
        tx_ref,
        amount,
        currency,
        redirect_url: 'http://localhost:5173/payment-success',
        payment_options: 'card,ussd,qr',
        customer: {
          email,
          phonenumber: phone,
          name,
        },
        customizations: {
          title: 'TAB FOODS',
          description: 'Payment for items',
          logo: 'https://tabfoods.com.ng/assets/tab-foods-logo-Bep5H409.png',
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.FLUTTERWAVE_TEST_SECRET_KEY}`,
        },
      }
    );

    res.json(response.data); // Return payment link to frontend
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Payment initialization failed' });
  }
};

export default initiatePayment;
