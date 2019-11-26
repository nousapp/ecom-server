const format = require('pg-format');
// Helpers for Authentication

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