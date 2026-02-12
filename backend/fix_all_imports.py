#!/usr/bin/env python3
"""
Comprehensive import fix for synergy_ui backend
"""

import os
import re

def fix_all_imports():
    """Fix all SYNERGY_UI imports to be lowercase"""
    
    # Walk through all Python files
    for root, dirs, files in os.walk('synergy_ui'):
        for file in files:
            if file.endswith('.py'):
                file_path = os.path.join(root, file)
                print(f"Fixing {file_path}...")
                
                try:
                    with open(file_path, 'r') as f:
                        content = f.read()
                    
                    # Fix SYNERGY_UI imports to synergy_ui
                    content = re.sub(r'from SYNERGY_UI\.', 'from synergy_ui.', content)
                    content = re.sub(r'import SYNERGY_UI\.', 'import synergy_ui.', content)
                    
                    with open(file_path, 'w') as f:
                        f.write(content)
                    
                    print(f"Fixed {file_path}")
                except Exception as e:
                    print(f"Error fixing {file_path}: {e}")

if __name__ == "__main__":
    fix_all_imports()
