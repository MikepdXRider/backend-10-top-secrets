const Router = require('express');
const Secret = require('../models/Secret.js');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const createSecretResp = await Secret.insert({
        ...req.body,
        userId: req.user.id,
      });
      res.send(createSecretResp);
    } catch (err) {
      next(err);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const getSecretsResp = await Secret.getAll();
      res.send(getSecretsResp);
    } catch (err) {
      next(err);
    }
  });
