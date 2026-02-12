#!/usr/bin/env python3
import sys
import os

# Add the NewEdenBackend directory to Python path
sys.path.insert(0, '/home/crisptech/NewEdenBackend')

# Change to the NewEdenBackend directory
os.chdir('/home/crisptech/NewEdenBackend')

from app import create_app, db

app = create_app()

with app.app_context():
    db.create_all()
    print("✅ Database initialized successfully!")
