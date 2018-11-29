var express = require('express');
var router = express.Router();

/* GET playlist page. */
router.get('/', function(req, res, next) {
    res.render('playlist', { name: 'playlist' });
});

module.exports = router;
