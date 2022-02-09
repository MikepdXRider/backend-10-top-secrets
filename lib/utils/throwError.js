/**
 *
 * @param {string} message
 * @param {number} statusCode
 */
module.exports = function throwError(message, statusCode) {
  const error = new Error(message);
  error.status = statusCode;
  throw error;
};
