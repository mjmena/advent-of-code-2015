var fs = require('fs');
fs.readFile('./input.txt', 'utf8', function (err,data) {
    if (err) {
        return console.log(err);
    }
    
    var dimensions = data.split(/\n/);
    var wrapping_paper = dimensions.reduce(function(acc, present){
        var dimensions = present.split(/x/);
        var x = dimensions[0];
        var y = dimensions[1];
        var z = dimensions[2];
        return acc + 2*x*y + 2*x*z + 2*y*z + Math.min(x*y,Math.min(y*z,x*z));
    }, 0);

    var ribbon = dimensions.reduce(function(acc, line){
        var dimensions = line.split(/x/);
        var l = parseInt(dimensions[0]);
        var w = parseInt(dimensions[1]);
        var h = parseInt(dimensions[2]);
        var largest_side = Math.max(l,Math.max(w,h));
    
        var perimeter = 0;
        var bow = l*w*h;
        
        if(largest_side === l){
            perimeter = 2*w + 2*h
        } else if(largest_side === w){
            perimeter = 2*l + 2*h
        }else{
            perimeter = 2*l + 2*w
        }
        return acc + perimeter + bow;
    }, 0);
  
  console.log(wrapping_paper);
  console.log(ribbon);
});