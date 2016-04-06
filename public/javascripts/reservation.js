/**
 * Created by Fobid on 2016. 4. 4..
 */
(typeof global == 'undefined' ? window : global).reservationUtils = reservationUtils = {

    common: {},
    constants: {},
    value: {},
    data: {},
    net: {},
    draw: {},
    func: {
        team: {},
        email: {},
        reset: {},
    },
    util: {},
    form: {}
};

reservationUtils.func.createReservation = function () {

    //if (!/^(?=.*[a-zA-Z가-힣]).{2,}$/.test(userData.name)) {
    //    alert('이름은 2자 이상 입력하세요.');
    //    return;
    //}

    var reservation = {
        name: $('#name').val(),
        roomNumber: $('#roomNumber').val(),
        price: $('#price').val(),
        type: $('#type').val(),
        startDate: $('#startDate').val(),
        endDate: $('#endDate').val(),
        amount: $('#amount').val(),
        note: $('#note').val(),
        isCheckedIn: $('#isCheckedIn').is(":checked"),
        isCheckedOut: $('#isCheckedOut').is(":checked"),
        isCleaned: $('#isCleaned').is(":checked"),
        isRemoved: false
    };

    $.ajax({
        url: "/reservations/book",
        type: "POST",
        data: JSON.stringify(reservation),
        dataType: "json",
        success: function (result) {
            console.log(result);
            location.href('reservations');
        },
        error: function (result) {
            console.log(result);
        }
    });
};
