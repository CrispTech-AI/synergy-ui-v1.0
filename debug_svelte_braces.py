
filename = '/home/crisptech/projects/synergy-ui-v1.0/src/lib/components/channel/MessageInput.svelte'

with open(filename, 'r') as f:
    lines = f.readlines()

# Extract lines for the textarea (approx 898 to 956)
start_line = 898
end_line = 956
content = "".join(lines[start_line:end_line])

print(f"Checking content from line {start_line} to {end_line}")

# Simple brace counter (ignoring strings for now, assuming simple code)
# We need to handle {{ }} and { }
# Svelte attributes: name={value}

balance = 0
in_string = False
string_char = ''

for i, char in enumerate(content):
    if in_string:
        if char == string_char:
            # check for escape
            if i > 0 and content[i-1] == '\\':
                pass
            else:
                in_string = False
    else:
        if char == '"' or char == "'":
            in_string = True
            string_char = char
        elif char == '{':
            balance += 1
        elif char == '}':
            balance -= 1
            if balance < 0:
                print(f"Negative balance at index {i}: {content[i-10:i+10]}")

print(f"Final balance: {balance}")

# specifically check on:keydown
import re
match = re.search(r'on:keydown={(.*?)}(?=\s+on:paste)', content, re.DOTALL)
if match:
    keydown_body = match.group(1)
    # Count braces in keydown body
    kb = 0
    for char in keydown_body:
        if char == '{': kb += 1
        elif char == '}': kb -= 1
    print(f"on:keydown internal balance: {kb}")
    if kb != 0:
         print("on:keydown seems unbalanced!")
else:
    print("Could not isolate on:keydown")
