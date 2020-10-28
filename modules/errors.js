let createError = require('http-errors');

module.exports = errorHandler;

function errorHandler (err, req, res, next) {
    console.log("Route in errors.js is:", req.path);
    if (typeof (err) === 'string') {
        // custom application error
        return res.status(400).json({ message: err });
    }

    if (err.name === 'AuthenticationError') {
        return res.status(401).json({ name: err.name, message: err.message });
    }

    if (err.name === 'UnauthorizedError' && err.message === 'invalid token') {
        return res.status(401).json({ name: "AuthenticationError", message: "Authentication Failed: Your token is corrupt or has expired." });
    }

    handleAll(err, req, res, null)
    // default to 500 server error
    //return res.status(500).json({ message: err.message });
}

function handleAll (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
}