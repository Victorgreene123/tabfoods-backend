// import jwt from 'jsonwebtoken'
// import nodemailer from 'nodemailer'
// import dotenv from 'dotenv';
// import usermodel from '../models/Userschema.js';


// dotenv.config()
// const { JWT_SECRET, EMAIL_USER, EMAIL_PASS, CLIENT_URL } = process.env;

// // Nodemailer configuration
// const transporter = nodemailer.createTransport({
    
//     service:'gmail', // You can use other services like SendGrid, Outlook, etc.
//     auth: {
//         user: EMAIL_USER,
//         pass: EMAIL_PASS,
//     },
// });

// // Forgot Password Handler
// export const forgotPassword = async (req, res) => {
//     const { email } = req.body;

//     try {
//         // Check if the user exists
//         const user = await usermodel.findOne({ email });
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         // Generate a reset token
//         const resetToken = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

//         // Construct the reset URL
//         const resetURL = `${CLIENT_URL}/reset-password/${resetToken}`;

//         // Email options
//         const mailOptions = {
//             from: `"HireMe" <${EMAIL_USER}>`, // Replace with your app name or email
//             to: email,
//             subject: "Password Reset Request",
//             html: `
//                 <h1>Password Reset</h1>
//                 <p>Hi ${user.name},</p>
//                 <p>You requested to reset your password. Click the link below to reset your password:</p>
//                 <a href="${resetURL}">${resetURL}</a>
//                 <p>If you didn't request this, please ignore this email.</p>
//             `,
//         };

//         // Send the email
//         await transporter.sendMail(mailOptions);

//         return res.status(200).json({ message: "Password reset email sent successfully" });
//     } catch (error) {
//         console.error("Error in forgotPassword:", error);
//         return res.status(500).json({ message: "Internal server error" });
//     }
// };



