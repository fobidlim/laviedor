/**
 * Created by Fobid on 2016. 4. 4..
 */
var mongoose = require('mongoose');

var reservationSchema = {
    resId: {
        type: String, index: true
    },
    name: String,
    roomNumber: Number,
    price: Number,
    type: String,
    startDate: Date,
    endDate: Date,
    note: String,
    isCheckedIn: Boolean,
    isCheckedOut: Boolean,
    isCleaned: Boolean,
    isRemoved: Boolean
};

module.exports = {
    connect: function (url) {
        mongoose.connect(url);
    },
    Model: mongoose.model('reservation', reservationSchema),
};