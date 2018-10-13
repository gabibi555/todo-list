function makeId() {
    var length = 6;
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return txt;
}

function getFromStorage(key) {
    var val = localStorage.getItem(key);
    return JSON.parse(val)
}

function saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
}


// function getTimeStamp() {
//     var date = new Date
//     var month = date.getMonth() + 1
//     var day = date.getDate()
//     var year = date.getFullYear()
//     var hour = date.getHours()
//     var min = date.getMinutes()
//     var sec = date.getSeconds()

//     if (min < 9) {
//         min = '0' + min.toString()
//     }
//     if (sec < 9) {
//         sec = '0' + sec.toString()
//     }
//     if (day < 9) {
//         day = '0' + day.toString()
//     }
//     if (month < 9) {
//         month = '0' + month.toString()
//     }

//     var timeStamp = `${hour}:${min}:${sec}    ${day}/${month}/${year}`
//     return timeStamp
// }
function getHumanDate(timeStamp) {
    var date = new Date(timeStamp)
    var month = date.getMonth() + 1
    var day = date.getDate()
    var year = date.getFullYear()
    var hour = date.getHours()
    var min = date.getMinutes()
    var sec = date.getSeconds()

    if (min < 9) {
        min = '0' + min.toString()
    }
    if (sec < 9) {
        sec = '0' + sec.toString()
    }
    if (day < 9) {
        day = '0' + day.toString()
    }
    if (month < 9) {
        month = '0' + month.toString()
    }

    var timeStamp = `${hour}:${min}:${sec}    ${day}/${month}/${year}`
    return timeStamp
}