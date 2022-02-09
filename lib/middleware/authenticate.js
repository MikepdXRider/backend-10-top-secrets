const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const cookie = req.cookies.process.env.COOKIE_NAME;
    console.log('cookie', cookie);
    const payload = jwt.verify(cookie, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    // console.log(err);
    err.message = 'You must be signed in to continue';
    err.status = 403;
    next(err);
  }
};
