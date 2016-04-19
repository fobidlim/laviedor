/**
 * Created by Fobid on 2016. 4. 15..
 */
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('reservations');
});

module.exports = router;
