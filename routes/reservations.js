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
router.post('/', function (req, res) {
    var body = req.body;

    var name = body['name'];
    var startDate = body['startDate'];
    var endDate = body['endDate'];
    var amount = body['amount'];
    var note = body['note'];
    var isCheckedIn = body['isCheckedIn'];
    var isCheckedOut = false;
    var isCleaned = body['isCleaned'];
    var isRemoved = false;

    for (var i = 0; i < amount; i++) {
        var roomNumber = body['roomNumber'];
        var price = body['price'];
        var type = body['type'];

        var reservationForm = {
            name: name,
            roomNumber: roomNumber,
            price: price,
            type: type,
            startDate: startDate,
            endDate: endDate,
            amount: amount,
            note: note,
            isCheckedId: isCheckedIn,
            isCheckedOut: isCheckedOut,
            isCleaned: isCleaned,
            isRemoved: isRemoved
        };

        co(function * ()
        {
            var reservation = yield createReservation(reservationForm);
            if (i == amount - 1) {
                res.json(error.getSucceed({
                    ok: true
                }));
                return reservation;
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
        reservationModel.Model.create(reservation, function(err, insert) {
            if (err) {
                reject(err);
            } else {
                resolve(util.refine(insert._doc));
            }
        });
    });
}

module.exports = router;
