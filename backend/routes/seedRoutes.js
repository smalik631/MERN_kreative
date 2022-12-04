import express from 'express';
import data from '../data.js';
import Product from '../models/productModel.js';
import User from '../models/userModel.js';

//seedrouter object from express.router
const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
  //remove all record in product model
  await Product.remove({});
  // add new product fromdata.js of backend
  const createProducts = await Product.insertMany(data.products);

  await User.remove({});
  // add new product fromdata.js of backend
  const createUsers = await User.insertMany(data.users);

  // send data to frontend
  res.send({ createProducts, createUsers });
});
export default seedRouter;
