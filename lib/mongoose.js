/**
 * Created by Fobid on 2016. 4. 4..
 */
var mongoose = require('mongoose');

var reservationSchema = {
    name: String,
    startDate: Date,
    endDate: Date,
    amount: Number,
    details: Array,
    note: String,
    isCheckedIn: Boolean,
    isCheckedOut: Boolean,
    isCleaned: Boolean,
    isRemoved: Boolean
}

var roomDetailSchema = {
    name: Number,
    price: Number,
    type: String
}

module.exports = {
    connect: function (url) {
        mongoose.connect(url);
    },
    Reservation: mongoose.model('reservation', reservationSchema),
    RoomDetail: mongoose.model('roomDetail', roomDetailSchema)
};