var lights = [];

for (var i = 0; i < 1000; i++) {
    lights[i] = [];
    for (var j = 0; j < 1000; j++) {
        lights[i][j] = 0;
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
                    lights[i][j] += 1;
                }
            }
        }
        else if (method === "turn off") {
            for (var i = from.x; i <= to.x; i++) {
                for (var j = from.y; j <= to.y; j++) {
                    lights[i][j] -= 1;
                    if(lights[i][j] < 0){
                        lights[i][j] = 0;
                    }
                }
            }
        }
        else {
             for (var i = from.x; i <= to.x; i++) {
                for (var j = from.y; j <= to.y; j++) {
                    lights[i][j] += 2;
                }
            }
        }
        
        return lights; 
    }, lights);



    var light_brightness = lights.reduce(function(lights_brightness, light_string) {
        return lights_brightness + light_string.reduce(function(lights_brightness, light_brightness) {
            return lights_brightness + light_brightness;
        })
    }, 0);

    console.log(light_brightness);
});