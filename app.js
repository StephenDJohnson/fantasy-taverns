const express = require('express');

require('dotenv').config();
require('./global_functions');
const userController = require('./controllers/UsersController');
const tavernController = require('./controllers/TavernsController');
const roomController = require('./controllers/RoomsController');
const guestController = require('./controllers/GuestsController');
const bodyParser = require('body-parser');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { poolPromise } = require('./data/db');
const sql = require('mssql');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
let opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.jwt_encryption;

passport.use(
    new JwtStrategy(opts, async (jwtPayload, done) => {
        let err, user;
        const pool = await poolPromise;

        try {
            user = await pool
                .request()
                .input('Id', sql.Int, jwtPayload.user_id)
                .query(
                    'select ID, UserName, RoleID, TavernID from users where Id = @Id',
                );
            user = user.recordset.shift();
        } catch (e) {
            console.error(e);
        }

        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        }
        return done(null, false);
    }),
);
// CORS
app.use((req, res, next) => {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    );
    // Request headers you wish to allow
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-Requested-With, content-type, Authorization, Content-Type',
    );
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

app.post('/users', userController.create);
app.post('/login', userController.login);
app.post(
    '/rooms', 
    passport.authenticate('jwt', { session: false }), 
    roomController.addRoom
    );
app.put(
    `/rooms/:roomID`,
    passport.authenticate('jwt', { session: false }), 
    roomController.editRoom,
);
app.get(
    '/taverns', 
    passport.authenticate('jwt', { session: false }),
    tavernController.getAll,
    );
app.get(
    '/rooms', 
    passport.authenticate('jwt', { session: false }),
    tavernController.getTavern,
    tavernController.getRooms,
    ); 

app.get(
    '/rooms/book', 
    passport.authenticate('jwt', { session: false }),
    roomController.getRooms,
    ); 

app.get(
    '/rooms/:roomId', 
    passport.authenticate('jwt', { session: false }),
    tavernController.getById,
    ); 

app.get(
'/users', 
passport.authenticate('jwt', { session: false }),
guestController.getGuests,
); 

app.post(
    '/roomstays', 
    passport.authenticate('jwt', { session: false }),
    guestController.addStay,
    );



console.log('SERVER READY');
module.exports = app;
