/**
 * Created by Fobid on 2016. 4. 4..
 */
var mongoose = require('mongoose');

var reservationSchema = {
    resId: {
        type: String, index: true
    },
    title: String, // 타이틀
    name: String, // 고객 성명
    price: Number, // 단가
    room: Object, // 객실 정보
    type: Object, // 예약 타입
    startDate: Date, // 체크인
    endDate: Date, // 체크아웃
    note: String, // 비고
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
    number: { // 객실 번호
        type: Number, index: true
    },
    type: String, // 객실 타입
    isAvailable: Boolean, // 가능 여부
    isCleaned: Boolean // 청소 여부
};

var reservationTypeSchema = {
    name: { // 예약 타입
        type: String, index: true
    },
    option: String // 타입 옵션
};

module.exports = {
    connect: function (url) {
        mongoose.connect(url);
    },
    Reservation: mongoose.model('reservation', reservationSchema),
    Room: mongoose.model('room', roomSchema),
    ReservationType: mongoose.model('roomType', reservationTypeSchema)
};