/**
 * Created by Fobid on 2016. 4. 4..
 */
var configFile = process.argv[2]?process.argv[2]:'../config/default.json';
var config = require(configFile);
var mongo = require('../lib/mongoose');
mongo.connect(config.mongoURL);
var Variable = mongo.Variable;

var argv = process.argv;

var type = argv[2];
var value = argv[3];

if(!type || !value) {
    console.log('usage : node /path/to/setvar.js key value');
    process.exit();
}

Variable.update({type : type}, {$set : {value : value}}, {upsert : true}, function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log(type + ' : ' + value);
    }
    process.exit();
});