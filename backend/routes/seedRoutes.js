import express from 'express';
import data from '../data.js';
import Product from '../models/productModel.js';

//seedrouter object from express.router
const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
  //remove all record in product model
  await Product.remove({});
  // add new product fromdata.js of backend
  const createProducts = await Product.insertMany(data.products);
  // send data to frontend
  res.send({ createProducts });
});
export default seedRouter;
