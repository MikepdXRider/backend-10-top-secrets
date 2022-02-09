const UserService = require('../services/UserService.js');

// Controller for users routes. Should include full crud.
const Router = require('express');

module.exports = Router().post('/', async (req, res, next) => {
  try {
    const response = await UserService.create({ ...req.body });
    res.send(response);
  } catch (err) {
    next(err);
  }
});
