const bcrypt = require('bcryptjs');
/**
 * SALT_ROUNDS
 * @description Used to determine how many times should salt be generated. Note: Time grows expoentially the higher it is. 10 is recommended according to auth0.com/blog/hashing-in-action-understanding-bcrypt/ under "Best Practices"
 */
const SALT_ROUNDS = 10;

/**
 * @typedef {Object} Hash&Salt
 * @property {string} hash - The hash of the password and salt
 * @property {string} salt - The salt used in the password
 */

/**
 * hashPassword
 *
 * @description: Takes in a string password and hashes it using bcrypt library.
 * @param {string} password Password used to register / login
 * @returns {Hash&Salt} The hash and salt
 */
async function hashPassword(password) {
  try {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hash = await bcrypt.hash(password, salt);
    return { salt, hash };
  } catch (err) {
    throw new Error('Failed to generate hash / salt.');
  }
}
module.exports = hashPassword;
