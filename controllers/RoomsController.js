const sql = require('mssql');
const { poolPromise } = require('../data/db');

getRooms = async function(req, res) {
    // format request

    let rooms;

    res.setHeader('Content-Type', 'application/json');

    const pool = await poolPromise;

    try {
        rooms = await pool
            .request()
            .query(
                // eslint-disable-next-line quotes
                `select * from Rooms`,
            );
        rooms = rooms.recordset;
    } catch (e) {
        returnError(res, e, 500);
    }

    return res.json(rooms);
};

module.exports.getRooms = getRooms;

const addRoom = async function(req, res) {
    res.setHeader('ContentType', 'application/json');
    const body = req.body;
    let roomPool;

    if (!body.RoomName || !body.DailyRate) {
        return returnError(res, 'Please enter a value', 422);
    }
    const pool = await poolPromise;
    
    try {
        roomPool = await pool
            .request()
            .input('RoomName', sql.VarChar, body.RoomName)
            .input('TavernID', sql.Int, body.TavernID)
            .input('DailyRate', sql.Int, body.DailyRate)
            .input('RoomStatus', sql.Int, body.RoomStatus)

            .query(
                'INSERT INTO ROOMS ([RoomName], [DailyRate], [TavernId], [RoomStatus]) OUTPUT inserted.* values (@RoomName, @DailyRate, @TavernId, @RoomStatus)',
            );
        OKMessage = roomPool.recordset.shift();
    } catch (e) {
       returnError(res, e, 500);
    }

    return returnSuccessResponse (res, OKMessage, 201);
};

module.exports.addRoom = addRoom;

const editRoom = async function(req, res) {
    res.setHeader('ContentType', 'application/json');
    const body = req.body;
    console.log(req.body);
    if (!body.RoomName || !body.DailyRate) {
        return returnError(res, 'Please enter a value', 422);
    }
    const pool = await poolPromise;
    
    try {
        roomPool = await pool
            .request()
            .input('RoomName', sql.VarChar, body.RoomName)
            .input('ID', sql.Int, body.ID)
            .input('DailyRate', sql.Float, body.DailyRate)
            .input('RoomStatus', sql.VarChar, body.RoomStatus)
            .input('TavernID', sql.Int, body.TavernID)
            .query(
               'Update Rooms Set RoomName = @RoomName, TavernID = @TavernID, DailyRate = @DailyRate, RoomStatus = @RoomStatus Where ID = @ID',
            );
    } catch (e) {
       returnError(res, e, 500);
    }

    return returnSuccessResponse (res, 'Success', 201);
};

module.exports.editRoom = editRoom;