import axios from 'axios'


const FLUTTERWAVE_SECRET_KEY = "FLWSECK_TEST-4d2caa94a9017a315d67b42684817535-X";

const initiatePayment = async (req , res) =>{


  const { amount, currency, email, phone } = req.body;

  try {
    const response = await axios.post(
      'https://api.flutterwave.com/v3/payments',
      {
        tx_ref: `tx-${Date.now()}`, // Unique transaction reference
        amount,
        currency,
        redirect_url: 'http://localhost:5173/payment-success', // React frontend route
        payment_options: 'card,ussd,qr',
        customer: {
          email,
          phonenumber: phone,
          name: "Customer Name",
        },
        customizations: {
          title: "Your Business Name",
          description: "Payment for items",
          logo: "https://your-logo-url.com/logo.png", // Optional logo
        },
      },
      {
        headers: {
          Authorization: `Bearer ${FLUTTERWAVE_SECRET_KEY}`,
        },
      }
    );

    res.json(response.data); // Return payment link to the frontend
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Payment initialization failed" });
  }
}
// Initialize Payment


export default initiatePayment

