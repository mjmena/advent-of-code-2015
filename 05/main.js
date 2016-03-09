var fs = require('fs');
fs.readFile('./input.txt', 'utf8', function (err,data) {
    if (err) {
        return console.log(err);
    }
    
    var words = data.split(/\n/);
    
    var niceList1 = words.filter(function(word){
        var vowels = word.split("").reduce(function(vowels, letter){
            if(letter.match(/a|e|i|o|u/) === null){
                return vowels; 
            }
            
            return vowels + 1; 
        },0);

        var hasRepeat = word.match(/([a-z])\1{1,}/) !== null;

        var isNaughty = word.match(/((ab)|(cd)|(pq)|(xy))/) !== null; 

        return vowels >= 3 && hasRepeat && !isNaughty
    });
    
    console.log("Nice List (version 1):" +niceList1.length);
    
    var niceList2 = words.filter(function(word){
        var hasUniqueRepeatedPattern = word.match(/([a-z][a-z]).*\1/) !== null;
        var hasRepeatWithLetterInBetween = word.match(/([a-z]).\1/) !== null; 

        return hasUniqueRepeatedPattern && hasRepeatWithLetterInBetween
    });
    
    console.log("Nice List (version 2):" +niceList2.length);
});