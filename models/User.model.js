require('dotenv').config();
const shortid = require('shortid');
const format = require('pg-format');
const db = require('mssql');
// Auth Helpers
const { userExists, createUser, storeToken } = require('../db/auth');
// UTILS
const hashPassword = require('../utils/hashPassword');
const checkPassword = require('../utils/checkPassword');
const createToken = require('../utils/generateToken');
const ErrorWithHttpStatus = require('../utils/ErrorWithHttpStatus');
 

/**
 * @typedef {Object} User
 * @property {string} acl
 * @property {string} UserCode
 * @property {string} UserName
 */ 


/**
 * registerUser
 * @description: Handles all actions for account information.
 * @param {string} username
 * @param {string} password
 * @param {string} firstName
 * @param {string} lastName
 * @param {string} role
 */
exports.registerUser =  async ({ username, password, firstName, lastName, role }) => {
  try {
    // Checks if all inputs are in request
    if(!username || !password || !firstName || !lastName || !role){
      throw new ErrorWithHttpStatus('Missing Properties', 400);
    }
    if (await userExists(username)) {
      throw new ErrorWithHttpStatus('User already exists.', 400);
    }
    const { hash, salt } = await hashPassword(password);
    await createUser(username, hash, salt, firstName, lastName, role);
    return 'User Succesfully Created'
  } catch (err) {
    console.log(err);
    if (err instanceof ErrorWithHttpStatus) throw err;
    else throw new ErrorWithHttpStatus('Database Error', 500);
  }
}

/**
 * loginUser
 * @description Handles the logic for logging in users.
 * @param {string} username
 * @param {string} password
 * @returns {string} JWT Token
 */
exports.loginUser = async ({ username, password}) => {
  try {
    // Checks if all inputs are in request
    if(!username || !password){
      throw new ErrorWithHttpStatus('Missing Properties', 400);
    }
    if (!(await userExists(username))) {
      throw new ErrorWithHttpStatus('User does not exists.', 400);
    }
    const { uuid, fullName } = await checkPassword(username, password);
    const token = await createToken(uuid, fullName);
    await storeToken(uuid, token);
    return token;
  } catch (err) {
    console.log(err);
    if (err instanceof ErrorWithHttpStatus) throw err;
    else throw new ErrorWithHttpStatus('Database Error', 500);
  } 
}

/* Read */
/**
 * Selects users from db.
 * Can accept optional query object to filter results.
 * Otherwise returns all users
 * @param {Object} {query}
 * @returns {Promise<Object[]>}
 */
// CODE FOR QUERIES
exports.select = async ( query = {} ) => {
  try {
    // MSSQL METHOD
    // Initiate Request
    const pool = await db.connect(`${process.env.DATABASE_URL}`);
    let reqPool = await pool.request() 
    // Handle Query Values
    Object.values(query).forEach(async (value, index) => {
      reqPool.input(index, value);
    })
    // Handle Query Keys
    const clauses = Object.keys(query)
      .map((key,i) => `%I = @${i}`)
      .join(' AND ');
    // Handle Format String
    const formattedSelect = format(
      `SELECT _id, username, LastName, FirstName, MiddleName, SortName, Role, _updatedAt FROM dbo.users ${clauses.length ? `WHERE ${clauses}` : ''}`,
      ...Object.keys(query)  
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
};


/**
 *  Updates a User
 * @param {string} id - id of the User to update
 * @param {User} newData - subset of values to update
 * @returns {Promise<void>}
 */
exports.update = async (id, newData) => {
  try {
    return 'UPDATE User';
  } catch(err) {
    console.log(err);
    if (err instanceof ErrorWithHttpStatus) throw err;
    else throw new ErrorWithHttpStatus('Database Error', 500);
  }
};


/**
 *  Deletes a User
 * @param {string} id - id of the User to delete
 * @returns {Promise<void>}
 */
// TODO: Add error handler
exports.delete = async id => {
  try {
    return 'DELETE User';
  } catch (err) {
    if (err instanceof ErrorWithHttpStatus) throw err;
    else throw new ErrorWithHttpStatus('Database Error', 500);
  }
};