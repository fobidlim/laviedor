/**
 * Created by Fobid on 2016. 4. 5..
 */
/*
 * 응답 메시지를 자동으로 만들어주는 툴
 */

var match = {
    'SUCCEED' : 2000,
    'DEPRECATED_API' : 3000,
    'ERROR' : 5000,
    'FAILURE' : 4000,
    'FILE_UPLOAD_FAILURE' : 5001,
    'DATABASE_IS_LOCKED' : 5002,
    'INVALID_PARAMS' : 4001,
    'UNSUPPORTED_FORMAT' : 4002,
    'INVALID_TOKENS' : 4003,
    'UNSUPPORTED_VERSION' : 4004,
    'DENIED_USER' : 4005,
    'NOT_AUTHORIZED' : 4006,
    'FORBIDDEN_USER' : 4101,
    'NOT_REGISTERED_USER' : 4102,
    'NOT_REGISTERED_DEVICE' : 4103,
    'INVALID_CODE' : 4104,
    'NOT_REGISTERED_PHONE' : 4105,
    'INVALID_RANDOMIZE_TOKEN' : 4106,
    'NOTICE_NOT_FOUND' : 4107,
    'ALREADY_REGISTERED' : 4201,
    'ALREADY_REGISTERED_USER' : 4202,
    'NOT_FOUND_ROOM' : 4301,
    'ALREADY_JOINED' : 4302,
    'NOT_JOINED_USER' : 4303,
    'UNSUPPORTED_DATE_FORMAT' : 4304,
    'TALK_IS_NOT_MINE' : 4305,
    'DO_NOT_RESPONSE_TO_ADMIN_CHAT' : 4306,
    'SEARCH_IS_NOT_PERMITTED' : 4400,
    'NOT_FOUND_GROUP' : 4500,
    'NOT_JOINED_USER_GROUP' : 4501,
    'BAD_GROUP_PERMISSION' : 4502,
    'NOT_FOUND_BOARD' : 4503,
    'INVALID_DATE' : 4504,
    'NOT_FOUND_FEED' : 4505,
    'NOT_FOUND_COMMENT' : 4506,
    'RESTRICTED_FILE_TYPE' : 4600,
    'ALREADY_HAS_TEAM' : 4701,
    'GROUP_IS_NOT_TEAM' : 4702,
    'ALREADY_JOINED_USER_GROUP' : 4703,
    'NOT_INVITED_USER' : 4704,
    'NOT_SIGNED_INVITATION' : 4705,
    'DENIED_BY_TEAM' : 4706,
    'NOT_FOUND_INVITATION' : 4707,
    'INVALID_INVITATION' : 4708,
    'NOT_JOINED_USER_TEAM' : 4709,
    'EXISTS_COMPANY' : 4710,
    'NOT_FOUND_COMPANY' : 4711,

    'BAD_ACCESS' : 4999
};

var MSGES = {
    'SUCCEED' : '',
    'DEPRECATED_API' : '사용되지 않는 API입니다.',
    'ERROR' : 'internal error',
    'FAILURE' : 'undefined failure',
    'FILE_UPLOAD_FAILURE' : '파일 업로드에 실패하였습니다',
    'INVALID_PARAMS' : 'please check your parameters',
    'UNSUPPORTED_FORMAT' : 'please check your parameters. - ex);;Deptname;;',
    'INVALID_TOKENS' : 'please check token x-api-token',
    'UNSUPPORTED_VERSION' : 'your device type was wrong. - ex)[ios|android]',
    'DENIED_USER' : '인가된 사용자가 아닙니다',
    'NOT_AUTHORIZED' : '관리자 권한을 갖고 있지 않습니다',
    'NOT_PERMITTED_USER' : '허가되지 않은 권한입니다',
    'FORBIDDEN_USER' : 'your account was not in ERP',
    'NOT_REGISTERED_USER' : 'your account was not in this application',
    'NOT_REGISTERED_DEVICE' : 'your device was not registered in yours',
    'INVALID_CODE' : 'invalid auth code',
    'NOT_REGISTERED_PHONE' : 'not found user\'s phone',
    'INVALID_RANDOMIZE_TOKEN' : '올바르지 않은 임시 토큰입니다',
    'NOTICE_NOT_FOUND' : '알림을 찾을 수 없습니다.',
    'ALREADY_REGISTERED' : 'your device is already registered',
    'ALREADY_REGISTERED_USER' : '이미 가입된 이용자입니다.',
    'NOT_FOUND_ROOM' : 'not found room',
    'ALREADY_JOINED' : 'you are already joined in this room',
    'NOT_JOINED_USER' : 'you are not joined in this room',
    'UNSUPPORTED_DATE_FORMAT' : 'please check your parameters. - ex)2014-11-25T14:10:00+0900',
    'TALK_IS_NOT_MINE' : 'this talk is not mine',
    'DO_NOT_RESPONSE_TO_ADMIN_CHAT' : 'do not response to admin chat',
    'SEARCH_IS_NOT_PERMITTED' : 'check your permissions',
    'NOT_FOUND_GROUP' : 'not found group',
    'BAD_GROUP_PERMISSION' : 'you are not permitted',
    'NOT_JOINED_USER_GROUP' : 'you are not joined in this group',
    'NOT_FOUND_BOARD' : 'this board id is not validated',
    'INVALID_DATE' : 'date format is wrong',
    'NOT_FOUND_FEED' : 'this feed id is not validated',
    'DATABASE_IS_LOCKED' : 'some user use it',
    'NOT_FOUND_COMMENT' : 'this comment id is not validated',
    'RESTRICTED_FILE_TYPE' : '허가받지 않은 파일 타입입니다.',
    'ALREADY_HAS_TEAM' : '이미 가입된 팀이 있습니다',
    'GROUP_IS_NOT_TEAM' : '이 그룹은 팀이 아닙니다',
    ALREADY_JOINED_USER_GROUP : '이미 가입되어있습니다',
    'NOT_INVITED_USER' : '초대장을 받지 않은 사용자입니다',
    'NOT_SIGNED_INVITATION' : '승인받지 않은 초대장입니다.',
    'DENIED_BY_TEAM' : '팀이 없으면 작업을 하실 수 없습니다.',
    'NOT_FOUND_INVITATION' : '초대장을 찾을 수 없습니다. 코드가 다르거나 만료되었을 수 있습니다.',
    'INVALID_INVITATION' : '초대장의 정보가 실제와 일치하지 않습니다.',
    'NOT_JOINED_USER_TEAM' : '팀에 가입되어있지 않습니다.',
    'EXISTS_COMPANY' : '이미 존재하는 부서입니다.',
    'NOT_FOUND_COMPANY' : '존재하지 않는 부서입니다.',
    'BAD_ACCESS' : '잘못된 접근입니다.'
};

exports.codeno = match;

exports.getError = function(code, msg) {
    var cc = match[code];
    var myMsg = msg?msg:MSGES[code];
    return {
        code : code?code:'ERROR',
        codeno : cc?cc:match['ERROR'],
        msg : myMsg?myMsg:MSGES['ERROR'],
        data : null
    };
};

exports.getSucceed = function(data, next) {
    var r = {
        code : 'SUCCEED',
        codeno : match['SUCCEED'],
        msg : null,
        data : null
    };
    if(data) {
        r['data'] = data;
    }
    if(next) {
        r['next'] = next;
    }
    return r;
};
