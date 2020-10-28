
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let fs = require('fs');
const jwt = require('./modules/jwt');
const errorHandler = require('./modules/errors');

// router paths
let indexRouter = require('./routes/index');
let authRouter = require('./routes/auth')
let junkRouter = require('./routes/about')

let app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    //intercepts OPTIONS method
    if ('OPTIONS' === req.method) {
        //respond with 200
        res.sendStatus(200);
    }
    else {
        //move on
        next();
    }
});
// create a write stream (in append mode)
let accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.use(logger('combined', { stream: accessLogStream }));
app.use(express.json());
//app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
// use our custom JWT auth to secure the api
app.use(jwt());

// api routes
app.use('/', indexRouter);
app.use('/about', junkRouter);
app.use('/auth', authRouter);

// we're going to move this elsewhere to simplify here, and expand there
app.use(errorHandler);

module.exports = app;
