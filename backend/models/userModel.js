// create mongos model
import mongoose from 'mongoose';

//-----mongoose.schema accept 2 parameters one is fiels
// and second is options
const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
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
const User = mongoose.model('User', UserSchema);

export default User;
