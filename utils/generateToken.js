const jwt = require('jsonwebtoken');
/**
 * createToken
 * @description Generates a token for each user when they log in.
 * @param {int} id
 * @param {string} username
 */
async function createToken(id, username) {
  const payload = {
    id,
    username
  };
  const additionalInformation = {
    issuer: 'accounts.caresolutions.netlify.com',
    audience: 'caresolutions.netlify.com',
    expiresIn: process.env.JWT_EXPIRATION_TIME
  };
  return jwt
    .sign(payload, process.env.PRIVATE_KEY, additionalInformation)
    .toString();
}
module.exports = createToken;
