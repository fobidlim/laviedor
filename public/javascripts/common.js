/**
 * Created by Fobid on 2016. 4. 19..
 */
function getToday() {
    var today = new Date();

    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var day = today.getDate();

    if (day < 10) {
        day = '0' + day;
    }
    if (month < 10) {
        month = '0' + month;
    }

    return year + '' + month + '' + day;
}

function getPrevDay(date) {
    var year = date.substring(0, 4);
    var month = date.substring(4, 6);
    var day = date.substring(6, 8);


    var today = new Date(year, month, day);

    today.setDate(today.getDate() - 1);

    year = today.getFullYear();
    month = today.getMonth();
    day = today.getDate();

    if (day < 10) {
        day = '0' + day;
    }
    if (month < 10) {
        month = '0' + month;
    }

    return year + '' + month + '' + day;
}

function getNextDay(date) {
    var year = date.substring(0, 4);
    var month = date.substring(4, 6);
    var day = date.substring(6, 8);


    var today = new Date(year, month, day);

    today.setDate(today.getDate() + 1);

    year = today.getFullYear();
    month = today.getMonth();
    day = today.getDate();

    if (day < 10) {
        day = '0' + day;
    }
    if (month < 10) {
        month = '0' + month;
    }

    return year + '' + month + '' + day;
}