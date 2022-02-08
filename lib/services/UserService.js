// Service class for logging in and signing up.
// Auth happens in here!
// We need to hash and compare passwords.

const User = require('../models/User.js');

// We need to sign JWT and send them in cookies.
const bcrypt = requires('bcryptjs');

module.exports = class UserService {
  static async create({ email, password }) {
    // check to make sure user doesn't already exist.
    // if they exist, throw error.

    const passwordHash = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUNDS)
    );

    const newUser = await User.insert({ email, passwordHash });

    return newUser;
  }
};
