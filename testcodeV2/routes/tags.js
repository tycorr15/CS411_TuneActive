var express = require('express');
var router = express.Router();

/* GET tags page. */
router.get('/', function(req, res, next) {
    res.render('tags', { name: 'tags' });
});

module.exports = router;
