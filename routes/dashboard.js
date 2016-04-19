/**
 * Created by Fobid on 2016. 4. 3..
 */
var warn = global.warn;

var express = require('express');
var mongoose = require('../lib/mongoose');
var co = require('co');
var error = require('./error');
var reservationModel = require('../model/reservation');
var async = require('async');
var util = require('../lib/util');
var _ = require('underscore');
var router = express.Router();

// 모든 예약 정보 가져오기
router.get('/', function (req, res, next) {

    //reservationModel.getReservations(function (err, reservations) {
    //    if (err) {
    //        warn(err);
    //        res.json(error.getError());
    //        return;
    //    }
    //
    //    if (err) {
    //        warn(err);
    //        res.json(error.getError());
    //        return;
    //    }
    //    res.json(error.getSucceed({
    //        reservations: reservations
    //    }));
    //});

    res.render('reservations');

});

router.get('/list', function (req, res, next) {
    reservationModel.getReservations(function (err, reservations) {
        if (err) {
            warn(err);
            res.json(error.getError());
            return;
        }

        if (err) {
            warn(err);
            res.json(error.getError());
            return;
        }

        console.log(reservations);

        res.json(error.getSucceed({
            reservations: reservations
        }));

        //res.render('reservations', {'reservations': reservations});
    });
});

// 예약 넣기
router.post('/book', function (req, res) {
    var body = req.body;

    console.log('/book request: ' + JSON.stringify(body));

    var name = body['name'];
    var rooms = JSON.parse(body['rooms']);
    var startDate = body['startDate'];
    var endDate = body['endDate'];
    var note = body['note'];
    var isCheckedIn = body['isCheckedIn'];

    for (var i = 0; i < rooms.length; i++) {
        var reservation = {
            name: name,
            room: rooms[i],
            startDate: startDate,
            endDate: endDate,
            note: note,
            isCheckedIn: isCheckedIn,
            isCheckedOut: false,
            isRemoved: false
        };


        //reservationModel.Reservation.createReservation(reservationForm, function (err, reservation) {
        //    if (err) {
        //        //reject(err);
        //        console.log("create error");
        //    } else {
        //        if (i == amount) {
        //            res.json(error.getSucceed({
        //                ok: true
        //            }));
        //        }
        //        //resolve(util.refine(insert._doc));
        //        console.log("create success");
        //    }
        //});

        co(function * ()
        {
            var result = yield createReservation(reservation);
            if (i == rooms.length) {
                res.json(error.getSucceed({
                    ok: true
                }));
                return result;
            }
        }
    ).
        catch(function (e) {
            console.error(e);
            res.json(error.getError('ERROR'));
        });
    }
});

function createReservation(reservation) {
    return new Promise(function (resolve, reject) {
        reservationModel.Reservation.create(reservation, function (err, insert) {
            if (err) {
                reject(err);
                console.log("create error");
            } else {
                resolve(util.refine(insert._doc));
                console.log("create success");
            }
        });
    });
}

module.exports = router;
