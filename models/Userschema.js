import mongoose from "mongoose";

const User = new mongoose.Schema({
    name: String,
    email: String,
    
    
    password:String,
    role: {
        type: String,
        default: "user"
    },
    

})


const usermodel = mongoose.model("User" , User)

export default usermodel