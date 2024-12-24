// routes/auth.js
import { Router } from 'express';
import { login } from '../controllers/authController.js';
// import { forgotPassword } from '../controllers/forgotpassword.js';

const authrouter = Router();

authrouter.post('/login', login); // Route for logging in
// authrouter.post('/forgot-password' , forgotPassword)
export default authrouter;
