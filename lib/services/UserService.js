const User = require('../models/User.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const throwError = require('../utils/throwError.js');

module.exports = class UserService {
  static async create({ email, password }) {
    const user = await User.findUserByEmail(email);
    if (!user) {
      const passwordHash = await bcrypt.hash(
        password,
        Number(process.env.SALT_ROUNDS)
      );
      const newUser = await User.insert({ email, passwordHash });
      return newUser;
    } else {
      const error = new Error('User already registered.');
      error.status = 409;
      throw error;
    }
  }

  static async login({ email, password }) {
    const user = await User.findUserByEmail(email);
    if (user) {
      const actualPasswordHash = user.retrievePassword();
      const isPasswordValid = await bcrypt.compare(
        password,
        actualPasswordHash
      );
      if (isPasswordValid) {
        const token = jwt.sign({ ...user }, process.env.JWT_SECRET, {
          expiresIn: '1 day',
        });
        return { token, user };
      }
    }
    throwError('Please check your login credentials.', 409);
  }
};
