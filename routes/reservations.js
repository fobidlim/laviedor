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
var _ = require('underscore');
var router = express.Router();

// 모든 예약 정보 가져오기
router.get('/', function (req, res, next) {

    var query;
    var options = {};

    reservationModel.getReservations(query, options, function (err, reservations) {
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

        //console.log(reservations);
        //
        res.render('reservations', {'reservations': reservations});

        //res.json(error.getSucceed({
        //    reservations: reservations
        //}));

        //refine(reservation, function (err, reservations) {
        //    if (err) {
        //        warn(err);
        //        res.json(error.getError());
        //        return;
        //    }
        //
        //    //return res.render('reservations', {reservations: reservations});
        //
        //    res.json(error.getSucceed({
        //        reservations: reservations
        //    }));
        //});

        function refine(reservation, cb) {
            async.parallel(null, function (err, results) {
                if (err) {
                    cb(err);
                }
                var reservations = {};
                _.each(results, function (r) {
                    reservations = r.list;
                });

                console.log("refine: " + reservations.length);

                cb(null, reservations);
            });
        }
    });
});

// 예약 넣기
router.post('/book', function (req, res) {
    var body = req.body;

    var name = body['name'];
    var startDate = body['startDate'];
    var endDate = body['endDate'];
    var amount = body['amount'];

    var details = [];

    for (var i = 0; i < amount; i++) {
        details.push({
            name: body['name'],
            price: body['price'],
            type: body['type']
        });
    }

    var note = body['note'];
    var isCheckedIn = body['isCheckedIn'];
    var isCheckedOut = body['isCheckedOut'];
    var isCleaned = body['isCleaned'];
    var isRemoved = body['isRemoved'];

//if (!loginId) {
//    res.json(error.getError('INVALID_PARAMS'));
//    return;
//}

    var reservationForm = {
        name: name,
        startDate: startDate,
        endDate: endDate,
        amount: amount,
        details: details,
        note: note,
        isCheckedId: isCheckedIn,
        isCheckedOut: isCheckedOut,
        isCleaned: isCleaned,
        isRemoved: isRemoved
    };

    co(function * ()
    {
        var reservation = yield createReservation(reservationForm);
        res.json(error.getSucceed({
            ok: true
        }));
        return reservation;
    }
    ).
    catch(function (e) {
        console.error(e);
        res.json(error.getError('ERROR'));
    });
});

function createReservation(reservation) {
    return new Promise(function (resolve, reject) {
        reservationModel.create(reservation, function (err, insert) {
            if (err) {
                reject(err);
            } else {
                resolve(util.refine(insert._doc));
            }
        });
    });
}

module.exports = router;
