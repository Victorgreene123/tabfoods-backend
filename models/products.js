import mongoose from "mongoose";

const Product = new mongoose.Schema({
  name: String,
  price : Number,
  imageurl : String,
  
    

})


const productmodel = mongoose.model("Product" , Product)

export default productmodel