import re
with open('input.txt') as f:
    lines = f.read().splitlines()
    
    difference = 0
    
    for line in lines:
        difference += len(line) - len(eval(line))
        
    print(difference)
    
    difference = 0
    
    for line in lines:
        difference += len(re.escape(line)) + 2 - len(line)
        
    print(difference)