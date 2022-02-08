const UserService = require('../services/UserService.js');

// Controller for users routes. Should include full crud.
const Router = requires('express');

module.exports = Router().post('/', async (req, res, next) => {
  try {
    const response = await UserService({ ...req.body });
    res.send(response);
  } catch (err) {
    next(err);
  }
});
