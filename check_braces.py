
filename = '/home/crisptech/projects/synergy-ui-v1.0/src/lib/components/channel/MessageInput.svelte'

with open(filename, 'r') as f:
    lines = f.readlines()

# Check only the script block (assuming it ends at line 649)
script_content = "".join(lines[:649])

# Remove comments (simple regex approach, might be imperfect but helpful)
import re
# Remove // comments
script_content = re.sub(r'//.*', '', script_content)
# Remove /* */ comments
script_content = re.sub(r'/\*.*?\*/', '', script_content, flags=re.DOTALL)

stack = []
for i, char in enumerate(script_content):
    if char in '{[(':
        stack.append((char, i))
    elif char in '}])':
        if not stack:
            print(f"Error: Unmatched closing {char} at index {i}")
        else:
            last, idx = stack.pop()
            if (last == '{' and char != '}') or \
               (last == '[' and char != ']') or \
               (last == '(' and char != ')'):
                print(f"Error: Mismatched {last} at {idx} closed by {char} at {i}")

if stack:
    print(f"Error: Unmatched opening brackets: {stack}")
    # Print line number of the first unmatched bracket
    # Calculate line number
    for char, idx in stack:
        line_num = script_content[:idx].count('\n') + 1
        print(f"Unmatched {char} at line {line_num}")
else:
    print("Braces are balanced.")
