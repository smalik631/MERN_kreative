import express from 'express';
import Product from '../models/productModel.js';

//seedrouter object from express.router
const productRouter = express.Router();

// .get contain 2 parameters first the url thst is going to
//serve and second parameter is the function that respond
//to this url
productRouter.get('/', async (req, res) => {
  const products = await Product.find(); //here Product is from productModel
  res.send(products);
});

// returning product info based on product key
// /api/products add automatically
productRouter.get('/p_key/:p_key', async (req, res) => {
  // console.log('hello world');
  const product = await Product.findOne({ p_key: req.params.p_key });
  console.log(product);
  if (product) {
    console.log('data send');
    res.send(product);
  } else {
    //console.log('hell');
    res.status(404).send({ message: 'Product Not Found' });
  }
});

//cart
productRouter.get('/:id', async (req, res) => {
  // console.log('hello world');
  const product = await Product.findById(req.params.id);
  //console.log(product);
  if (product) {
    //console.log('data send');
    res.send(product);
  } else {
    //console.log('hell');
    res.status(404).send({ message: 'Product Not Found' });
  }
});

export default productRouter;
