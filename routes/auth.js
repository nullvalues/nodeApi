const express = require('express');
const router = express.Router();
const authService = require('../modules/auth');

router.post('/authenticate', authenticate);

function authenticate(req, res, next) {

    authService.authenticate(req.body)
        .then(user => res.json(user))
        .catch(next);
}

module.exports = router;