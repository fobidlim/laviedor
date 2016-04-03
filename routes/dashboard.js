/**
 * Created by Fobid on 2016. 4. 3..
 */

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('dashboard', { title: 'Express' });
});

module.exports = router;
