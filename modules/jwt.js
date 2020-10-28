const expressJwt = require('express-jwt');
const config = require('../config.json')

function jwt() {
    const { secret } = config;
    // include a slice of public routes that don't require auth, otherwise authenticate

    return expressJwt({ secret, algorithms: ['HS256'] }).unless({
        path: [
            '/auth/authenticate',
            '/about',
            '/about/',
            { url: /^\/stuff\/.*/, methods: ['GET'] }
        ]
    });
}

module.exports = jwt;