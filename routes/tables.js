/**
 * Created by Fobid on 2016. 4. 19..
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('tables', { title: 'Express' });
});

module.exports = router;
