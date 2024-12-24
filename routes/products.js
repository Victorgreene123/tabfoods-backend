import express from 'express';
import { addProduct, getProducts } from '../controllers/product.js';

const productrouter = express.Router();

productrouter.post('/', addProduct).get('/' , getProducts);
 
export default productrouter;