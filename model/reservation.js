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
    var queryData = Reservation.find();

    queryData.lean().exec(function (err, reservations) {
        cb(err, err ? null : reservations);
    });
}

exports.getReservations = getReservations;