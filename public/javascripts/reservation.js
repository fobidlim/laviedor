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
        startDate: $('#startDate').val(),
        endDate: $('#endDate').val(),
        amount: $('#amount').val(),
        price: $('#price').val(),
        note: $('#note').val(),
        isCheckedIn: $('#isCheckedIn').is(":checked"),
        isCheckedOut: $('#isCheckedOut').is(":checked"),
        isCleaned: $('#isCleaned').is(":checked"),
        isRemoved: $('#isRemoved').is(":checked")
    };

    reservationUtils.net.book({
        params: reservation,
        success: function (res) {

            if (res) {

                if (res.ok) {
                    location.replace('/');
                } else {
                    //switch (res.codeno) {
                    //    case 4001 :
                    //        alert('부적절한 정보가 입력되었습니다.');
                    //        break;
                    //    case 4104 :
                    //        alert('인증된 이메일이 아닙니다.\n정상적인 경로로 회원가입 해주세요.');
                    //        break;
                    //    default :
                    //        alert('네트워크 문제로 통신에 실패했습니다.');
                    //        break;
                    //
                    //}
                }

            } else {
                alert('네트워크 문제로 통신에 실패했습니다.');
            }

        },
        error: function (err) {

            alert('네트워크 문제로 통신에 실패했습니다.');

        }
    });


};