var md5 = require("blueimp-md5").md5;

var key = "ckczppom";
var answer_5 = -1;

do{
    answer_5++;
    var hash = md5(key+answer_5)
}while(hash.slice(0,5) !== "00000")

console.log(answer_5);

var answer_6 = answer_5

if(hash.slice(0,6) !== "000000"){
    do{
        answer_6++;
        var hash = md5(key+answer_6)
    }while(hash.slice(0,6) !== "000000")
}

console.log(answer_6);