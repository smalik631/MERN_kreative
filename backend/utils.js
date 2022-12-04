import jwt from 'jsonwebtoken';
export const generateToken = (user) => {
  // jwt jsonwebtoken object
  //and call sign funtion that contain user and secret string
  return jwt.sign(
    {
      //password do not pass
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );
};
