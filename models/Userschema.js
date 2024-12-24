import mongoose from "mongoose";

const User = new mongoose.Schema({
    name: String,
    email: String,
    
    
    password:String,
    

})


const usermodel = mongoose.model("User" , User)

export default usermodel