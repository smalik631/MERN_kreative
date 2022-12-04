import express from 'express';
import data from './data.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';

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

app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);

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
