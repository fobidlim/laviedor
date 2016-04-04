/**
 * Created by Fobid on 2016. 4. 4..
 */
var crypto = require('crypto');
var xml2js = require('xml2js');
var uuid = require('node-uuid');

var iv = 'a2xhcgAAAAAAAAAA';
var cryptKey = 'partner0801';

exports.sha1 = sha1;
exports.sha256 = sha256;
exports.parseXML = parseXML;
exports.refine = refine;
exports.refineList = refineList;
exports.addEscape = addEscape;
exports.parseBoolean = parseBoolean;
exports.getChosungList = getChosungList;
exports.aesEncrypt = aesEncrypt;
exports.aesDecrypt = aesDecrypt;
exports.getUUID = getUUID;

function sha1(str) {
    return crypto.createHash('sha1').update(str).digest('hex');
}
function sha256(str) {
    return crypto.createHash('sha256').update(str).digest('hex');
}

function refineList(list) {
    if(!list) {
        return list;
    }
    for(var i= 0,item;item=list[i];++i) {
        list[i] = refine(list[i].toJSON());
    }
    return list;
}

function refine(obj) {
    if(!obj) {
        return null;
    }
    var keys = Object.keys(obj);
    for(var i= 0,key;key=keys[i];++i) {
        if(!obj[key]) {
            //nothing to do
        } else if(obj[key].constructor == Date) {
            obj[key] = obj[key].toJSON();
        } else if(key == '_id') {
            obj[key] = obj[key].toString();
        }
    }
    return obj;
}

function parseXML(xml, cb) {
    xml2js.parseString(xml, function(err, parsed) {
        if(err) {
            cb(err);
        } else if(!parsed || !parsed.string || !parsed.string._) {
            cb(new Error('unsupported format'));
        } else {
            cb(null, parsed.string._);
        }
    });
}

function addEscape(str) {
    if(!str) {
        return str;
    }
    return str.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

function parseBoolean(o) {
    var check = null;
    switch(typeof(o)) {
        case 'string' :
            check = (o === 'true') ? true : (o === 'false' ? false : null);
            break;
        case 'boolean' :
            check = (o === true) ? true : (o === false ? false : null);
            break;
        case 'number' :
            check = !(o === 0);
            break;
    }
    return check;
}

var chosung = ["ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];
function getChosungList(str) {
    var chosungList = [];
    var cho, jung, jong, nTmp, len, c, i;
    len = str.length;
    for(i=0;i<len;++i) {
        c = str[i];
        nTmp = c.charCodeAt(0) - 0xAC00;
        jong = nTmp % 28; // 종성
        jung = ((nTmp - jong) / 28 ) % 21; // 중성
        cho = ( ( (nTmp - jong) / 28 ) - jung ) / 21; // 종성
        chosungList.push(chosung[cho]);
    }
    return chosungList;
}

function aesEncrypt(str) {
    var decodeKey = crypto.createHash('sha256').update(cryptKey, 'utf-8').digest();
    var cipher = crypto.createCipheriv('aes-256-cbc', decodeKey, iv);

    return cipher.update(str, 'utf8', 'hex') + cipher.final('hex');
}

function aesDecrypt(data) {
    var encodeKey = crypto.createHash('sha256').update(cryptKey, 'utf-8').digest();
    var cipher = crypto.createDecipheriv('aes-256-cbc', encodeKey, iv);

    return cipher.update(data, 'hex', 'utf8') + cipher.final('utf8');
}

function getUUID() {
    return uuid.v4();
}