import productmodel from '../models/products.js';


// Add a new product
export  const addProduct = async (req, res) => {
  try {
    const product = new productmodel(req.body);
    await product.save();
    res.status(201).json({message: "Product added successfully" , success: true});
  } catch (error) {
    res.status(400).json({message: "Error adding product" , success: false});
  }
};

// get all products

export const getProducts = async (req, res) => {
  try {
    const products = await productmodel.find({});
    res.status(200).json({products : products});
  } catch (error) {
    res.status(500).json({message: "Server Error" , success: false})
  }
}   