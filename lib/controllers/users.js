const Router = require('express');
const UserService = require('../services/UserService.js');

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const createRes = await UserService.create({ ...req.body });
      res.send(createRes);
    } catch (err) {
      next(err);
    }
  })
  .post('/session', async (req, res, next) => {
    try {
      const { user, token } = await UserService.login({ ...req.body });
      res.cookie(process.env.COOKIE_NAME, token, {
        httpOnly: true,
        maxAge: ONE_DAY_IN_MS,
      });
      res.send(user);
    } catch (err) {
      next(err);
    }
  })
  .delete('/session', async (req, res, next) => {
    try {
      res.clearCookie(process.env.COOKIE_NAME);
      res.json({
        status: 200,
        success: true,
        message: "You've been logged out!",
      });
    } catch (err) {
      next(err);
    }
  });
