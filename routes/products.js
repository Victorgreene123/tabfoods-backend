import express from 'express';
import { addProduct, deleteProduct, getProductById, getProducts, updateProduct } from '../controllers/product.js';

const productrouter = express.Router();

productrouter.post('/', addProduct).get('/' , getProducts).put('/:id' , updateProduct).get('/:id' , getProductById ).delete('/:id', deleteProduct);
 
export default productrouter;