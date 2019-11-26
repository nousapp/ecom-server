const format = require('pg-format');
// Helpers for Authentication


/**
 * userExists
 * @description: Checks if the username already exists in the database
 * @param {string} username
 */
async function userExists(username) {
  try {
    // MSSQL METHOD
    // Initiate Request
    const pool = await db.connect(`${process.env.DATABASE_URL}`);
    let reqPool = await pool.request() 
    // Handle Query Values
    reqPool.input(0, username);
    // Handle Format String
    const formattedSelect = format(
      `SELECT username FROM dbo.users WHERE username = @0`
    );
    // Pass in Query
    let result = await reqPool.query(formattedSelect);
    db.close();
    return result !== null;
  } catch (err) {
    throw err;
  }
}

/**
 * createUser
 * @description Stores user data in the database
 * @param {string} email
 * @param {string} password
 * @param {string} salt
 * @param {string} fullName
 * @param {string} location
 * @param {string} personaType
 */
async function createUser(email, password, salt, fullName, location) {
  try {
    // TODO:
  } catch (err) {
    throw err;
  }
}

/**
 * storeToken
 * @description Stores token in the user's database
 * @param {string} uuid The stored id in the JWT that corresponds with a user.
 * @param {string} token
 */
async function storeToken(uuid, token) {
  try {
    // TODO:
  } catch (err) {
    throw err;
  }
}

/**
 * Gets a user with an username INCLUDING salt and password
 * @description Gets all of a user's data.
 * @param {string} username
 * @returns {object} An object containing hash and salt
 */
async function getUserPrivate(username) {
  try {
    // MSSQL METHOD
    // Initiate Request
    const pool = await db.connect(`${process.env.DATABASE_URL}`);
    let reqPool = await pool.request() 
    // Handle Query Values
    reqPool.input(0, username);
    // Handle Format String
    const formattedSelect = format(
      `SELECT _id, username, salt, password FROM dbo.users WHERE username = @0`
    );
    // Pass in Query
    let result = await reqPool.query(formattedSelect);
    db.close();
    return result.recordset;
  } catch (err) {
    db.close();
    if (err instanceof ErrorWithHttpStatus) throw err;
    else throw new ErrorWithHttpStatus('Database Error', 500);
  }
}


module.exports = { userExists, createUser, storeToken, getUserPrivate };
