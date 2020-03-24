const sql = require('mssql');
const { poolPromise } = require('../data/db');

getGuests = async function(req, res) {
    // format request

    let guests;
    

    res.setHeader('Content-Type', 'application/json');

    const pool = await poolPromise;

    try {
        guests = await pool
            .request()
            .query(
                // eslint-disable-next-line quotes
                `select * from Users`,
            );
        guests = guests.recordset;
    } catch (e) {
        returnError(res, e, 500);
    }

    return res.json(guests);
};

module.exports.getGuests = getGuests;

