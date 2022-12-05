import express from 'express';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils.js';
import expressAsyncHandler from 'express-async-handler';
const userRouter = express.Router();

// post request for sigin
userRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    //expressAsyncHandler catch the error in the async function inside it
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      //check password
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: 'Invalid Email or Password' });
  }) //error found we handle in server.js
);

userRouter.post(
  '/signup',
  expressAsyncHandler(async (req, res) => {
    // create new user
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    });
    // save user in database
    const user = await newUser.save();
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user),
    });
  })
);

export default userRouter;
