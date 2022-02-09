const UserService = require('../services/UserService.js');

// Controller for users routes. Should include full crud.
const Router = require('express');

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
      res.cookie('session', token);
      res.send(user);
    } catch (err) {
      next(err);
    }
  });
