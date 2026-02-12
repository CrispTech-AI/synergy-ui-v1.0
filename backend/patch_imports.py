#!/usr/bin/env python3
"""
Fix circular imports in synergy_ui backend modules
"""

import os
import sys

def fix_imports():
    """Fix all circular import issues"""
    
    # Files to fix
    files_to_fix = [
        'synergy_ui/utils/logger.py',
        'synergy_ui/env.py'
    ]
    
    for file_path in files_to_fix:
        if os.path.exists(file_path):
            print(f"Fixing {file_path}...")
            
            with open(file_path, 'r') as f:
                content = f.read()
            
            # Fix relative imports to absolute
            content = content.replace('from ..constants import', 'from synergy_ui.constants import')
            content = content.replace('from ..env import', 'from synergy_ui.env import')
            content = content.replace('from constants import', 'from synergy_ui.constants import')
            
            with open(file_path, 'w') as f:
                f.write(content)
            
            print(f"Fixed {file_path}")

if __name__ == "__main__":
    fix_imports()
