const sql = require('mssql');
const { poolPromise } = require('../data/db');

saveRoom = async function(req, res) {

    res.setHeader('Content-Type', 'application/json');
    let room = req.body;
    if(!room.RoomName)  {
        return returnError(res, 'Please enter a Room Name', 422);
    }
    if(!room.DailyRate)  {
        return returnError(res, 'Please enter a Rate', 422);
    }

    const pool = await poolPromise;

    try {
        room = await pool
            .request()
            .input('RoomName', sql.VarChar(100), room.RoomName)
            .input('DailyRate', sql.float, room.DailyRate)
            .input('RoomId', sql.int, room.RoomId)
            .query(// eslint-disable-next-line quotes
                'Update Rooms Set RoomName = @RoomName, DailyRate = @DailyRate Where RoomID = @RoomId',
            )
        Room = room.recordset;
    } catch (e) {
        returnError(res, e, 500);
    }

    return returnSuccessResponse( res, Room, 201);
};

module.exports.saveRoom = saveRoom;

const addRoom = async function(req, res) {
    res.setHeader('ContentType', 'application/json');
    const body = req.body;

    if (!body.RoomName || !body.DailyRate) {
        return returnError(res, 'Please enter a value', 422);
    }
    const pool = await poolPromise;
    
    try {
        add_room = await pool
            .request()
            .input('RoomName', sql.VarChar, body.RoomName)
            .input('TavernID', sql.Int, body.TavernID)
            .input('DailyRate', sql.Int, body.DailyRate)
            .input('RoomStatus', sql.Int, body.RoomStatus)

            .query(
                'INSERT INTO ROOMS ([RoomName], [DailyRate], [TavernId], [RoomStatus]) OUTPUT inserted.* values (@RoomName, @DailyRate, @TavernId, @RoomStatus)',
            );
        result = add_room.recordset.shift();
    } catch (e) {
       returnError(res, e, 500);
    }

    return returnSuccessResponse(res, result, 201);
};

module.exports.addRoom = addRoom;