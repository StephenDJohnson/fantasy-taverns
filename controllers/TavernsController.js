const sql = require('mssql');
const { poolPromise } = require('../data/db');

const getAll = async function(req,res) {
    console.log(req.user);

    res.setHeader('Content Type', 'application/json');
    let taverns;

    const pool = await poolPromise;

    try {
        taverns = await pool
            .request()
            .input('UserId', sql.Int, 6)
            .query(
                'select * from Taverns where UserId = @UserId',
            );
        taverns = taverns.recordset;
    } catch(e) {
        returnError(res, e, 500);
    }
    return res.json(taverns);
};
