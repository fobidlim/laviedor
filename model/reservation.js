/**
 * Created by Fobid on 2016. 4. 4..
 */
var config = global.config;
var async = require('async');
var mongoose = require('../lib/mongoose');
var util = require('../lib/util');

var Reservation = mongoose.Reservation;
exports.Reservation = Reservation;


function getReservations(query, options, cb) {
    query.archive = false;
    var queryData = Reservation.find(query);
    if (options.sort) {
        queryData.sort(options.sort);
    }
    queryData.lean().exec(function (err, list) {
        cb(err, err ? null : list);
    });
}

exports.getReservations = getReservations;