var fs = require('fs');
fs.readFile('./input.txt', 'utf8', function(err, data) {
    if (err) {
        return console.log(err);
    }

    var memory = {};
        
    data.split(/\n/).forEach(function(statement){
        var expression = statement.match(/(?:(\d+)|([a-z]+)|((?:NOT\s)[a-z]+)|([a-z]+ AND [a-z]+)|([a-z]+ OR [a-z]+)|([a-z]+ LSHIFT \d+)|([a-z]+ RSHIFT \d+)) -> \w+/);
        
        if(expression[1] !== undefined){
            var parameters = statement.match(/(\d+) -> (\w+)/);
            var operand_value = Number.parseInt(parameters[1])
            var result_var = parameters[2];
        
            memory[result_var] = operand_value;
        }else if(expression[2] !== undefined){
            var parameters = statement.match(/([a-z]+) -> (\w+)/);
            var operand_var = parameters[1];
            var result_var = parameters[2];
        
            var operand_value = memory[operand_var];
            memory[result_var] = operand_value;
        }else if(expression[3] !== undefined){
            var parameters = statement.match(/(?:NOT\s)([a-z]+) -> (\w+)/);
            var operand_var = parameters[1];
            var result_var = parameters[2];
        
            var operand_value = memory[operand_var];
            memory[result_var] = ~(operand_value >>> 0);
        }else if(expression[4] !== undefined){
            var parameters = statement.match(/([a-z]+) AND ([a-z]+) -> (\w+)/);
            var operand1_var = parameters[1];
            var operand2_var = parameters[2];
            var result_var = parameters[3];
        
            var operand1_value = memory[operand1_var];
            var operand2_value = memory[operand2_var];
            memory[result_var] = operand1_value & operand2_value;
        }else if(expression[5] !== undefined){
            var parameters = statement.match(/([a-z]+) OR ([a-z]+) -> (\w+)/);
            var operand1_var = parameters[1];
            var operand2_var = parameters[2];
            var result_var = parameters[3];
        
            var operand1_value = memory[operand1_var];
            var operand2_value = memory[operand2_var];
            memory[result_var] = operand1_value | operand2_value;
        }else if(expression[6] !== undefined){
            var parameters = statement.match(/([a-z]+) LSHIFT (\d+) -> (\w+)/);
            var operand1_var = parameters[1];
            var operand2_value = Number.parseInt(parameters[2])
            var result_var = parameters[3];
        
            var operand1_value = memory[operand1_var];
            memory[result_var] = operand1_value << operand2_value;
        }else if(expression[7] !== undefined){
            var parameters = statement.match(/([a-z]+) RSHIFT (\d+) -> (\w+)/);
            var operand1_var = parameters[1];
            var operand2_value = Number.parseInt(parameters[2])
            var result_var = parameters[3];
            var operand1_value = memory[operand1_var];
            memory[result_var] = operand1_value >> operand2_value;
        }else{
            console.log(statement);
        }
    });
    console.log(memory);
});