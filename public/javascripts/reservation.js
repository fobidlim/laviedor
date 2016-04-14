/**
 * Created by Fobid on 2016. 4. 15..
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

    var rooms = [];
    var amount = $('#amount option:selected').val();
    var roomNumbers = [];
    var prices = [];

    $("input[name='roomNumber']").each(function () {
        roomNumbers.push($(this).val());
    });
    $("input[name='price']").each(function () {
        prices.push($(this).val());
    });

    for (var i = 0; i < amount; i++) {
        var room = {
            number: roomNumbers[i],
            type: {
                name: "", option: ""
            },
            price: prices[i],
            isAvailable: true,
            isCleaned: true
        };
        rooms.push(room);
    }

    var reservation = {
        name: $('#name').val(),
        rooms: JSON.stringify(rooms),
        startDate: $('#startDate').val(),
        endDate: $('#endDate').val(),
        note: $('#note').val(),
        isCheckedIn: $('#isCheckedIn').is(":checked"),
        isCheckedOut: $('#isCheckedOut').is(":checked"),
        isRemoved: false
    };

    $.ajax({
        url: "/reservations/book",
        type: "POST",
        data: reservation,
        dataType: "json",
        success: function (result) {
            console.log("resert: " + result);
            location.replace('/reservations');
        },
        error: function (err) {
            if (!err) {
                console.log("error: " + JSON.parse(err));
            } else {
                console.log("error: ?");
            }
        }
    });
};
