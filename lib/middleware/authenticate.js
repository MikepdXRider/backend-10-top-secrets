const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const cookie = req.cookies;
    console.log('cookie', cookie);
    const payload = jwt.verify(cookie, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    // console.log(err);
    err.message = 'Must be logged in';
    err.status = 403;
    next(err);
  }
};
