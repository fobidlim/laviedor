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

reservationUtils.func.setRooms = function () {

    var rooms = {};

    for (var i = 5; i < 19; i++) {

    }

    $.ajax({
        url: "/rooms/set",
        type: "POST",
        data: rooms,
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