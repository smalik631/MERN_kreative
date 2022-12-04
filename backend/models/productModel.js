// create mongos model
import mongoose from 'mongoose';

//-----mongoose.schema accept 2 parameters one is fiels
// and second is options
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    p_key: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    rating: { type: Number, required: true },
    numreviews: { type: Number, required: true },
  },
  {
    //when we create a recorde or a document in product collection
    //automatically two ne fields will be added to the above fields
    //and recorde update and create time
    timestamps: true,
  }
);

// after schema create model
// first parameter is --name of model--
// second is schema
const Product = mongoose.model('Product', productSchema);

export default Product;
