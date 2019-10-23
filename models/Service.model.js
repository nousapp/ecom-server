require('dotenv').config();
const shortid = require('shortid');
const format = require('pg-format');
const ErrorWithHttpStatus = require('../utils/ErrorWithHttpStatus');
// const db = require('../db/index')
const db = require('mssql');


/**
 * @typedef {Object} Service
 * @property {string} acl
 * @property {string} ServiceCode
 * @property {string} ServicedBy
 * @property {string} TransDate
 * @property {string} ResidentId
 */ 


/* Create */
/**
 * Inserts a new Service into the db
 * @param {Service} newService - the data to create the Service with
 * @returns {Promise<Service>} the created Service
 */
exports.insert = async ({ServiceCode, ServicedBy, TransDate, ResidentId }) => {
  try {
    return 'INSERT Service!';
  } catch (err) {
    db.close();
    if (err instanceof ErrorWithHttpStatus) throw err;
    else throw new ErrorWithHttpStatus('Database Error', 500);
  }
};

/* Read */
/**
 * Selects services from db.
 * Can accept optional query object to filter results.
 * Otherwise returns all services
 * @param {Object} {query}
 * @returns {Promise<Object[]>}
 */
// CODE FOR QUERIES
exports.select = async ( query = {} ) => {
  try {
    return 'SELECT SERVICE!';
  } catch (err) {
    db.close();
    if (err instanceof ErrorWithHttpStatus) throw err;
    else throw new ErrorWithHttpStatus('Database Error', 500);
  }
};


/**
 *  Updates a Service
 * @param {string} id - id of the Service to update
 * @param {Service} newData - subset of values to update
 * @returns {Promise<void>}
 */
exports.update = async (id, newData) => {
  try {
    return 'UPDATE Service!';
  } catch(err) {
    db.close()
    console.log(err);
    if (err instanceof ErrorWithHttpStatus) throw err;
    else throw new ErrorWithHttpStatus('Database Error', 500);
  }
};


/**
 *  Deletes a Service
 * @param {string} id - id of the Service to delete
 * @returns {Promise<void>}
 */
// TODO: Add error handler
exports.delete = async id => {
  try {
    return 'DELETE Service!';
  } catch (err) {
    db.close();
    if (err instanceof ErrorWithHttpStatus) throw err;
    else throw new ErrorWithHttpStatus('Database Error', 500);
  }
};