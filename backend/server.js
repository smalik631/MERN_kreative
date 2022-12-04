import express from 'express';
import data from './data.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// to fetch variables in the env File
dotenv.config();
// DOTENV.CONFIGE LOADED value in env file to process.env
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to db ');
  })
  .catch((err) => {
    console.log(err.message);
  });
const app = express();
// app.get contain 2 parameters first the url thst is going to
//serve and second parameter is the function that respond
//to this url
app.get('/api/products', (req, res) => {
  res.send(data.products);
});
// returning product info based on product key
app.get('/api/products/p_key/:p_key', (req, res) => {
  // console.log('hello world');
  const product = data.products.find((x) => x.p_key == req.params.p_key);
  //console.log(product);
  if (product) {
    //console.log('data send');
    res.send(product);
  } else {
    //console.log('hell');
    res.status(404).send({ message: 'Product Not Found' });
  }
});

//
app.get('/api/products/:id', (req, res) => {
  // console.log('hello world');
  const product = data.products.find((x) => x._id === req.params.id);
  //console.log(product);
  if (product) {
    //console.log('data send');
    res.send(product);
  } else {
    //console.log('hell');
    res.status(404).send({ message: 'Product Not Found' });
  }
});

// define port that we use in response for backend

//process.eve.PORT is convention to access to the free port if not
//found set to 5000 or any number
const port = process.env.PORT || 5000;

//server start and ready for responsing to the frontend
//first parameter is the port number and second is the callback function that
//will run when server is ready
app.listen(port, () => {
  //we use backtick literal `` to access variable inside literal string
  console.log(`serve at http://localhost:${port}`);
});
