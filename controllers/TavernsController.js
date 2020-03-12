const sql = require('mssql');
const { poolPromise } = require('../data/db');

getAll = async function(req, res) {
    // format request

    let taverns;

    res.setHeader('Content-Type', 'application/json');

    const pool = await poolPromise;

    try {
        taverns = await pool
            .request()
            .query(
                // eslint-disable-next-line quotes
                `select * from Taverns`,
            );
        taverns = taverns.recordset;
    } catch (e) {
        returnError(res, e, 500);
    }

    return res.json(taverns);
};

module.exports.getAll = getAll;

getTavern = async function(req, res) {
    // format request

    let tavern;

    res.setHeader('Content-Type', 'application/json');

    const pool = await poolPromise;

    try {
        tavern = await pool
            .request()
            .input('UserId', sql.Int, 6)
            .query(
                // eslint-disable-next-line quotes
                'Select TavernName, RoomName, DailyRate FROM rooms r Join Taverns t on (t.ID = r.TavernID) Join Users u on (u.TavernID = t.ID)  Where u.ID = @UserId',
            );
        tavern = tavern.recordset;
    } catch (e) {
        returnError(res, e, 500);
    }

    return res.json(tavern);
};

module.exports.getTavern = getTavern;