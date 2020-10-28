var express = require('express');
var api = require('../modules/api.js')
var router = express.Router();

/* GET a simple listing of some predefined document type. */
router.get('/', async function(req, res, next) {
  let about = await api.about();
  if (about == undefined) {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end();
  } else {
    res.json(about);
  }
});

/* GET a simple listing of some predefined document type. */
router.get('/exes', async function(req, res, next) {
  let exes = await api.wholeSet();
  if (exes == undefined) {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end();
  } else {
    res.json(exes);
  }
});

module.exports = router;
