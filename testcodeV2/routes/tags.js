var express = require('express');
var router = express.Router();

/* GET tags page. */
router.get('/', function(req, res, next) {
    res.render('tags', { name: 'tags', country: req.session.loc, country: req.session.loc});
});

module.exports = router;
