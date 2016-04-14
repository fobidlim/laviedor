/**
 * Created by Fobid on 2016. 4. 4..
 */
var config = global.config;
var async = require('async');
var mongoose = require('../lib/mongoose');
var util = require('../lib/util');

var Reservation = mongoose.Reservation;
exports.Reservation = Reservation;


function getAllReservations(cb) {
    var query = {
        isRemoved: false
    };
    var queryData = Reservation.find(query).sort({"room.number": -1});

    queryData.lean().exec(function (err, reservations) {
        cb(err, err ? null : reservations);
    });
}

function getReservations(query, options, cb) {
    var queryData = Reservation.find(query).sort({roomNumber: -1});

    queryData.lean().exec(function (err, reservations) {
        cb(err, err ? null : reservations);
    });
}

function createReservation(reservation, cb) {
    console.log("createReservation: " + JSON.stringify(reservation));
    Reservation.insert(reservation, function (err, reservation) {
        cb(err, reservation);
    });
}

exports.getReservations = getAllReservations;
exports.createReservation = createReservation;