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
            .input('UserId', sql.Int, req.user.ID)
            .input('RoomName', sql.VarChar, req.query.search)
            .query(
                // eslint-disable-next-line quotes
                `Select TavernName, t.ID, RoomName, r.ID, DailyRate FROM rooms r Join Taverns t on (t.ID = r.TavernID) Join Users u on (u.TavernID = t.ID)  Where u.ID = @UserId and RoomName Like '%' + @RoomName + '%'`
            );
        tavern = tavern.recordset;
    } catch (e) {
        returnError(res, e, 500);
    }

    return res.json(tavern);
};

module.exports.getTavern = getTavern;

getById = async function(req, res) {


    let roomId = parseInt(req.params.roomId);
    res.setHeader('Content-Type', 'application/json');
    let roomPool;
    let room;
    const pool = await poolPromise;

    try {
        roomPool = await pool
            .request()
            .input('Id', sql.Int, roomId)
            .query(
                // eslint-disable-next-line quotes
                `Select * FROM rooms Where Id = @Id`
            );
        room = roomPool.recordset.shift();
    } catch (e) {
        returnError(res, e, 500);
    }

    return returnSuccessResponse(res, room, 200);
};

module.exports.getById = getById;

getRooms = async function (req, res) {
    // format request

    let rooms;

    res.setHeader('Content-Type', 'application/json');

    const pool = await poolPromise;

    try {
        rooms = await pool
            .request()
            .query(
                // eslint-disable-next-line quotes
                `select * from Rooms Order By DailyRate Desc`,
            );
        rooms = rooms.recordset;
    } catch (e) {
        returnError(res, e, 500);
    }

    return res.json(rooms);
};

module.exports.getRooms = getRooms;