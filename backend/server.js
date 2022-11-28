import express from 'express';
import data from './data.js';
const app = express();
// app.get contain 2 parameters first the url thst is going to
//serve and second parameter is the function that respond
//to this url
app.get('/api/products', (req, res) => {
  res.send(data.products);
});
// define prot that we use in response for backend

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