// create mongos model
import mongoose from 'mongoose';

//-----mongoose.schema accept 2 parameters one is fiels
// and second is options
const orderSchema = new mongoose.Schema(
  {
    orderItems: [
      {
        p_key: { type: String, required: true },
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          // refrence from ProductModel
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
      },
    ],
    shippingAddress: {
      fullName: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: { type: String, required: true },
    paymentResult: {
      id: String,
      status: String,
      update_time: String,
      email_address: String,
    },
    itemsPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    taxPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    // also save the user who order this request
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
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
const Order = mongoose.model('Order', orderSchema);

export default Order;
