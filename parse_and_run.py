import json
import re

with open("/Users/mac/.gemini/antigravity/brain/5c1dde32-5e37-44bb-a893-06b5794144f4/.system_generated/logs/overview.txt") as f:
    text = f.read()

# We look for blocks wrapped in "Copy\n...the code here...\n" 
# or split by "Python\n\nCopy\n" as we saw in the prompt.
sections = text.split("Python\n\nCopy\n")

if len(sections) > 1:
    with open("generate_full.py", "w") as out:
        for sec in sections[1:]:
            # The code block usually continues until the next markdown header or text block.
            # But the user prompt had literal strings like:
            # Python
            # Copy
            # # First, let's create ...
            lines = sec.split("\n")
            
            # The code block ends when another element like "Now let me create..." appears.
            # A simple heuristic: find the first block of non-indented text that isn't a comment
            # Wait, it's easier to just use the raw text if we split carefully, or just
            # write everything to a file and we can manually clean it up.
            
            code_lines = []
            for line in lines:
                if line.startswith("Now let me create") or line.startswith("Python"):
                    break
                code_lines.append(line)
            
            out.write("\n".join(code_lines) + "\n\n")

print("Created generate_full.py")
