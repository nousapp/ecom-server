const format = require('pg-format');
const ErrorWithHttpStatus = require('../utils/ErrorWithHttpStatus');
const db = require('../db/index');

/**
 * @typedef {Object} Resident
 * @property {string} name
 * @property {string} serviceCode
 * @property {string} servicedBy
 * @property {string} residentID
 * @property {string} roomNum
 * @property {string} date
 */


/* Read */
/**
 * Selects snippets from db.
 * Can accept optional query object to filter results.
 * Otherwise returns all snippets
 * @param {Object} {query}
 * @returns {Promise<Object[]>}
 */
// // CODE FOR QUERIES
// exports.select = async (query = {}) => {
exports.select = async () => {
  try {
    // // CODE FOR QUERIES
    // const clauses = Object.keys(query)
    //   .map((key,i) => `%I = $${i + 1}`)
    //   .join(' AND ');
    // console.log(clauses);
    // const formattedSelect = format(
    //   `SELECT * FROM snippet ${clauses.length ? `WHERE ${clauses}` : ''}`,
    //   ...Object.keys(query)
    // );
    // const result = await db.query(formattedSelect, Object.values(query));
    const result = await db.query('SELECT * FROM snippet')
    return result.rows;
  } catch (err) {
    console.log(err);
    if (err instanceof ErrorWithHttpStatus) throw err;
    else throw new ErrorWithHttpStatus('Database Error', 500);
  }
};


