/**
 * Created by Fobid on 2016. 4. 3..
 */

var express = require('express');
var mongoose = require('../lib/mongoose');
var co = require('co');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('reservations', {title: 'Express'});
});

/*
 * 회원 가입을 실시합니다.
 */
router.post('/book', function (req, res) {
    var body = req.body;

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
        startDate: startDate,
        endDate: endDate,
        amount: amount,
        details: details,
        note: note,
        isCheckedId: isCheckedIn,
        isCheckedOut: false,
        isCleaned: isCleaned,
        isRemoved: false
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
        mongoose.Reservation.create(reservation, function (err, insert) {
            if (err) {
                reject(err);
            } else {
                resolve(util.refine(insert._doc));
            }
        });
    });
}

module.exports = router;
