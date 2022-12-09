import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

//seedrouter object from express.router
const productRouter = express.Router();

// .get contain 2 parameters first the url thst is going to
//serve and second parameter is the function that respond
//to this url
productRouter.get('/', async (req, res) => {
  const products = await Product.find(); //here Product is from productModel
  //console.log('hello');
  res.send(products);
});

const PAGE_SIZE = 3;
productRouter.get(
  '/search',
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const pageSize = query.pageSize || PAGE_SIZE;
    const page = query.page || 1;
    const category = query.category || '';
    const price = query.price || '';
    const rating = query.rating || '';
    const order = query.order || '';
    const searchQuery = query.query || '';

    const queryFilter =
      searchQuery && searchQuery !== 'all'
        ? {
            // filter based on query
            name: {
              $regex: searchQuery,
              $options: 'i',
            },
          }
        : {}; // if all not filter
    const categoryFilter = category && category !== 'all' ? { category } : {};
    const ratingFilter =
      rating && rating !== 'all'
        ? {
            rating: {
              $gte: Number(rating),
            },
          }
        : {};
    const priceFilter =
      price && price !== 'all'
        ? {
            // 1-50
            price: {
              $gte: Number(price.split('-')[0]), //min
              $lte: Number(price.split('-')[1]), //max
            },
          }
        : {};
    const sortOrder =
      order === 'featured'
        ? { featured: -1 }
        : order === 'lowest'
        ? { price: 1 } // 1 ascending
        : order === 'highest'
        ? { price: -1 } //descending
        : order === 'toprated'
        ? { rating: -1 }
        : order === 'newest'
        ? { createdAt: -1 }
        : { _id: -1 };

    const products = await Product.find({
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    })
      .sort(sortOrder)
      // applay on product not find
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    const countProducts = await Product.countDocuments({
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    });
    res.send({
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize), //calculate all pages
    });
  })
);

productRouter.get(
  '/categories',
  expressAsyncHandler(async (req, res) => {
    const categories = await Product.find().distinct('category');
    res.send(categories);
  })
);

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

//-----------cart
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
