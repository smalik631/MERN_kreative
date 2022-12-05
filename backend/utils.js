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

// middelware function
export const isAuth = (req, res, next) => {
  //request authorization
  const authorization = req.headers.authorization;
  if (authorization) {
    // if exist get token
    const token = authorization.slice(7, authorization.length); //slice get rid of 7 character and get only token part
    // then verify token                    3rd parameter callback function
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        res.status(401).send({ message: 'Invalid Token' });
      }
      //decode is the decrypted version of token that contain user info
      else {
        req.user = decode;
        next(); //by next to go back to orderRoutes and execute instruction after isAuth..
      }
    });
  } else {
    res.status(401).send({ message: 'No Token' });
  }
};
