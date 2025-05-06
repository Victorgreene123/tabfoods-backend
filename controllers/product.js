import productmodel from '../models/products.js';


// Add a new product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await productmodel.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found", success: false });
    }
    res.status(200).json({ message: "Product deleted successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", success: false });
  }
};
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
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productmodel.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found", success: false });
    }
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ message: "Server Error", success: false });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await productmodel.find({});
    res.status(200).json({products : products});
  // Update product details
  
  } catch (error) {
    res.status(500).json({message: "Server Error" , success: false})
  }
}   

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await productmodel.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found", success: false });
    }
    res.status(200).json({ message: "Product updated successfully", success: true, product: updatedProduct });
  } catch (error) {
    res.status(400).json({ message: "Error updating product", success: false });
  }
};
