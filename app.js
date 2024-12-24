// Import express and other modules
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDb from './db/connect.js'; // Assuming connectDb is the exported function
import router from './routes/user.js';
import authrouter from './routes/auth.js';
import payment from './routes/payment.js';
import productrouter from './routes/products.js';

// Configure environment variables
dotenv.config();

// Create an instance of express
const app = express();

// Use middleware
app.use(cors());
app.use(express.json());

// Define a port
const PORT = process.env.PORT || 8000;

// Use the imported router with a base path
app.use('/api/auth', authrouter);
app.use('/api/users', router);
app.use('/api/payments' , payment)
app.use('/api/products' , productrouter)

// Start the server
const start = async () => {
  try {
    await connectDb(process.env.MONGO_URL); // Ensure MONGO_URL is defined in your .env file
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    
    console.log('Error starting server:', error);
  }
};

// Call the start function
start();
