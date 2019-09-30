require('dotenv').config();
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


/* Read */
/**
 * Selects snippets from db.
 * Can accept optional query object to filter results.
 * Otherwise returns all snippets
 * @param {Object} {query}
 * @returns {Promise<Object[]>}
 */
// // CODE FOR QUERIES
// exports.select = async ( query = {} ) => {
//   try {
//     await db.connect(`${process.env.DATABASE_URL}`);
//     // CODE FOR QUERIES
//     const clauses = Object.keys(query)
//       .map((key,i) => `%s = @${i + 1}`)
//       .join(' AND ');
  
//     const formattedSelect = format(
//       `SELECT * FROM ${process.env.RESIDENT_DB} ${clauses.length ? `WHERE ${clauses}` : ''}`,
//       ...Object.keys(query)  
//     );

//     const result = await db.query(formattedSelect, ...Object.values(query));
//     // // CODE WITHOUT QUERIES
//     // const result = await db.query(`SELECT * FROM ${process.env.RESIDENT_DB}`);

//     db.close();
//     return result.recordset;
//   } catch (err) {
//     console.log(err);
//     if (err instanceof ErrorWithHttpStatus) throw err;
//     else throw new ErrorWithHttpStatus('Database Error', 500);
//   }
// };

exports.select = async ( query = {} ) => {
  try {
    // await db.connect(`${process.env.DATABASE_URL}`);
    // CODE FOR QUERIES 
    // const clauses = Object.keys(query)
    //   .map((key,i) => `%s = ${'${'}valueArray[${i}]}`)
    //   .join(' AND ');
    // console.log(`Clauses: ${clauses}`);
    // console.log(`Object.keys(query): ${Object.keys(query)}`);
    // console.log(`Object.values(query): ${Object.values(query)}`);
    // console.log('Format String:');
    // console.log(`SELECT * FROM ${process.env.RESIDENT_DB} ${clauses.length ? `WHERE ${clauses}` : ''}`);
    // const formattedSelect = format(
    //   `SELECT * FROM ${process.env.RESIDENT_DB} ${clauses.length ? `WHERE ${clauses}` : ''}`,
    //   ...Object.keys(query)  
    // );
    // console.log(formattedSelect);
    // const result = await db.query(formattedSelect, ...Object.values(query));


    // MSSQL METHOD
    // Initiate Request
    const pool = await db.connect(`${process.env.DATABASE_URL}`);
    let step1 = await pool.request() 
    // Handle Queries
    Object.values(query).forEach(async (value, index) => {
      step1.input(index, value);
    })
    // pool.request().input('1', 'Escueta');
    // pool.request().input('2', '101');
    // let result1 = await pool.request()
    //         .input('1', 'Escueta')
    //         .input('2', '101')
    //         .query(`select * from ${process.env.RESIDENT_DB} where LastName = @1 and Room = @2`);
    // step1.input('0', 'Escueta');
    let result1 = await step1.query(`select * from ${process.env.RESIDENT_DB} where LastName = @0`);


    // // CODE WITHOUT QUERIES
    // const result = await db.query(`SELECT * FROM ${process.env.RESIDENT_DB}`);

    db.close();
    return result1.recordset;
  } catch (err) {
    console.log(err);
    if (err instanceof ErrorWithHttpStatus) throw err;
    else throw new ErrorWithHttpStatus('Database Error', 500);
  }
};


