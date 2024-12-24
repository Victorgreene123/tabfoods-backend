import mongoose from "mongoose";
import productmodel from "./products";

const Order = new mongoose.Schema({
    fullname: String,
    email: String,
    phone: String,
    address: String,
    
    products: productmodel ,
    
    

})


const ordermodel = mongoose.model("Order" , Order)

export default ordermodel