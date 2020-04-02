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

const addStay = async function(req, res) {
    res.setHeader('ContentType', 'application/json');
    const body = req.body;
    let roomPool;

    if (!body.RoomID || !body.GuestID || !body.StayDateStart) {
        return returnError(res, 'Please enter a value', 422);
    }
    const pool = await poolPromise;
    
    try {
        roomPool = await pool
            .request()
            .input('GuestID', sql.Int, body.GuestID)
            .input('RoomID', sql.Int, body.RoomID)
            .input('StayLength', sql.Int, body.StayLength)
            .input('BookingDate', sql.VarChar, body.BookingDate)
            .input('StayDateStart', sql.VarChar, body.StayDateStart)
            .input('DailyRate', sql.Int, body.DailyRate)

            .query(
                'INSERT INTO ROOMSTAYS ([BookingDate], [GuestID], [RoomID], [StayDateStart], [StayLength], [DailyRate]) OUTPUT inserted.* values (@BookingDate, @GuestID, @RoomID, @StayDateStart, @StayLength, @DailyRate)',
            );
        OKMessage = roomPool.recordset.shift();
    } catch (e) {
       returnError(res, e, 500);
    }

    return returnSuccessResponse (res, OKMessage, 201);
};

module.exports.addStay = addStay;