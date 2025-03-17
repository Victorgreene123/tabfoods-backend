import mongoose from "mongoose";
import productmodel from "./products.js";

const Order = new mongoose.Schema({
    fullname: String,
    email: String,
    phone: String,
    address: String,
    
    products: Array ,
    status: {
        type: String,
        default: "pending"
    },
    
    

})


const ordermodel = mongoose.model("Order" , Order)

export default ordermodel