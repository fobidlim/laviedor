/**
 * Created by Fobid on 2016. 4. 4..
 */
var mongoose = require('mongoose');

var reservationSchema = {
    resId: {
        type: String, index: true
    },
    name: String,
    room: Object,
    startDate: Date,
    endDate: Date,
    note: String,
    isCheckedIn: Boolean,
    isCheckedOut: Boolean,
    isRemoved: Boolean
};

/*
 * type
 * 0: 온돌
 * 1: 침대
 */
var roomSchema = {
    number: {
        type: Number, index: true
    },
    type: Object,
    price: Number,
    isAvailable: Boolean,
    isCleaned: Boolean
};

var roomTypeSchema = {
    name: {
        type: String, index: true
    },
    option: String
};

module.exports = {
    connect: function (url) {
        mongoose.connect(url);
    },
    Reservation: mongoose.model('reservation', reservationSchema),
    Room: mongoose.model('room', roomSchema),
    RoomType: mongoose.model('roomType', roomTypeSchema)
};