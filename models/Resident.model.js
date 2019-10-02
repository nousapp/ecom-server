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


/* Create */
/**
 * Inserts a new resident into the db
 * @param {Resident} newResident - the data to create the Resident with
 * @returns {Promise<Resident>} the created Resident
 */
exports.insert = async ({ FirstName, MiddleName, SortName, Room, ResidentId }) => {
  try {
    if(!FirstName || !MiddleName || !SortName || !Room || !ResidentId){
      throw new ErrorWithHttpStatus('Missing Properties', 400);
    }
    const result = await db.query(`INSERT INTO ${} (_id, _createdAt, _updatedAt, FirstName, MiddleName, SortName, Room, ResidentId) VALUES ($1, $2, $3, $4, $5)`, [code, title, description, author, language]);
    return result.rows;
    // if (!author || !code || !title || !description || !language)
    //   throw new ErrorWithHttpStatus('Missing Properties', 400);
    // // read snippets.json
    // const snippets = await readJsonFromDb('snippets');
    // // grab data from newSnippet (validate)
    // // make newSnippet a proper object
    // // generate default data (id, comments, favorites)
    // // push that object into snippets
    // snippets.push({
    //   id: shortid.generate(),
    //   author,
    //   code,
    //   title,
    //   description,
    //   language,
    //   comments: [],
    //   favorites: 0,
    // });
    // // write back to the file
    // await writeJsonToDb('snippets', snippets);
    // return snippets[snippets.length - 1];
  } catch (err) {
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


