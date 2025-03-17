import bcrypt from 'bcryptjs';
import userModel from '../models/Userschema.js';
import { json } from 'express';


const createUser = async (req, res) => {
  try {
    const email = req.body.email
    const password = req.body.password
   
    
    const existingUser = await userModel.findOne({email : email})
    
    if(existingUser){
        return res.status(409).json({message: "User already exists" , success: false})
    }
    if (!password || typeof password !== 'string') {
      return res.status(400).json({ error: 'Password must be provided as a string' });
    }
  
    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    
    req.body.password = hashedPassword
   

    // Create a new user object with the hashed password
    const newUser = await userModel.create(
      req.body
     
    );

    // Send a response with the user data (excluding password for security)
    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        // Exclude password from the response
      },
      success: true
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error creating user', error , success: false});
  }
};

const getUser = async (req, res) => {
  try {
    // Assume we're looking up the user by ID from the request parameters

    const  { id } = req.params;

    // Find the user by ID
    const user = await userModel.findById(id);

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send user data as response
    res.status(200).json({user : user});
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


const updateUser = async (req, res) =>{

    try {
        const {id} = req.params;
        const update = await userModel.findByIdAndUpdate({_id : id}, req.body, { runValidators: true});

        if(!update){
            return res.status(404).json({message: "User not found" , success : false})
        }

        res.status(201).json({message:"User updated" , success: true})
        
        
    } catch (error) {
        res.status(500).json({message: "Server Error" , success: false})
        
    }
}
const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).json({ users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await userModel.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found', success: false });
    }

    res.status(200).json({ message: 'User deleted successfully', success: true });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Server error', success: false });
  }
};

export { createUser, getUser, updateUser, getAllUsers, deleteUser };



