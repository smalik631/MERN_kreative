export const getError = (error) => {
  // here message is same as the message in Server.js file
  // res.status(404).send({ message: 'Product Not Found' });
  return error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
};
