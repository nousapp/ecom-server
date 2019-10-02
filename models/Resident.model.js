require('dotenv').config();
const shortid = require('shortid');
const format = require('pg-format');
const ErrorWithHttpStatus = require('../utils/ErrorWithHttpStatus');
// const db = require('../db/index')
const db = require('mssql');


/**
 * @typedef {Object} Resident
 * @property {string} acl
 * @property {string} LastName
 * @property {string} FirstName
 * @property {string} MiddleName
 * @property {string} SortName
 * @property {string} Room
 * @property {string} ResidentId
 */ 


/* Create */
/**
 * Inserts a new resident into the db
 * @param {Resident} newResident - the data to create the Resident with
 * @returns {Promise<Resident>} the created Resident
 */
exports.insert = async ({ FirstName, MiddleName, LastName, SortName, Room, ResidentId }) => {
  try {
    if(!FirstName || !MiddleName || !LastName || !SortName || !Room || !ResidentId){
      throw new ErrorWithHttpStatus('Missing Properties', 400);
    }
    const pool = await db.connect(`${process.env.DATABASE_URL}`);
    let idInput = shortid.generate();
    let dateRequest = await pool.request().query('SELECT getdate();'); 
    // Destructure date
    let dateInput =  Object.values(dateRequest.recordset[0])[0];

    // Create Resident
    await pool.request()
      .input('id', db.NVarChar(100), idInput)
      .input('createTime', dateInput)
      .input('lastName', db.NVarChar(100), LastName)
      .input('firstName', db.NVarChar(100), FirstName)
      .input('middleName', db.NVarChar(100), MiddleName)
      .input('sortName', db.NVarChar(100), SortName)
      .input('room', db.NVarChar(10), Room)
      .input('resId', db.NVarChar(100), ResidentId)
      .query(`INSERT INTO ${process.env.RESIDENT_DB} (_id, _createdAt, _updatedAt, LastName, FirstName, MiddleName, SortName, Room, ResidentId) VALUES (@id, @createTime, @createTime, @lastName, @firstName, @middleName, @sortName, @room, @resId);`);
    
    // Get created Resident
    let result = await pool.request()
      .input('id', db.NVarChar(100), idInput)
      .query( `SELECT * FROM ${process.env.RESIDENT_DB} WHERE _id = @id`);
    
    db.close();
    return result.recordset;
  } catch (err) {
    console.log(err);
    if (err instanceof ErrorWithHttpStatus) throw err;
    else throw new ErrorWithHttpStatus('Database Error', 500);
  }
};

/* Read */
/**
 * Selects snippets from db.
 * Can accept optional query object to filter results.
 * Otherwise returns all snippets
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
      `SELECT * FROM ${process.env.RESIDENT_DB} ${clauses.length ? `WHERE ${clauses}` : ''}`,
      ...Object.keys(query)  
    );
    // Pass in Query
    let result = await reqPool.query(formattedSelect);
    db.close();
    return result.recordset;
  } catch (err) {
    console.log(err);
    if (err instanceof ErrorWithHttpStatus) throw err;
    else throw new ErrorWithHttpStatus('Database Error', 500);
  }
};


