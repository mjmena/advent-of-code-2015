var lights = [];

for (var i = 0; i < 1000; i++) {
    lights[i] = [];
    for (var j = 0; j < 1000; j++) {
        lights[i][j] = false;
    }
}

var fs = require('fs');
fs.readFile('./input.txt', 'utf8', function(err, data) {
    if (err) {
        return console.log(err);
    }

    lights = data.split(/\n/).reduce(function(lights, command){
        var matches = command.match(/(turn on|turn off|toggle) (\d+),(\d+) through (\d+),(\d+)/);

        var method = matches[1];

        var from = {
            x: Number.parseInt(matches[2]),
            y: Number.parseInt(matches[3])
        }

        var to = {
            x: Number.parseInt(matches[4]),
            y: Number.parseInt(matches[5])
        }

        if (method === "turn on") {
            for (var i = from.x; i <= to.x; i++) {
                for (var j = from.y; j <= to.y; j++) {
                    lights[i][j] = true;
                }
            }
        }
        else if (method === "turn off") {
            for (var i = from.x; i <= to.x; i++) {
                for (var j = from.y; j <= to.y; j++) {
                    lights[i][j] = false;
                }
            }
        }
        else {
             for (var i = from.x; i <= to.x; i++) {
                for (var j = from.y; j <= to.y; j++) {
                    lights[i][j] = !lights[i][j];
                }
            }
        }
        
        return lights; 
    }, lights);



    var lights_on = lights.reduce(function(lights_on, light_string) {
        return lights_on + light_string.reduce(function(lights_on, lit) {
            if (lit) {
                return lights_on + 1;
            }
            else {
                return lights_on + 0;
            }
        })
    }, 0);

    console.log(lights_on);
});