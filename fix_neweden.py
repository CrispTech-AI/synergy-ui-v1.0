#!/usr/bin/env python3
import os

# Change to the NewEdenBackend directory
os.chdir('/home/crisptech/NewEdenBackend')

# Recreate app/__init__.py
init_content = '''from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
import os

db = SQLAlchemy()

def create_app():
    load_dotenv()
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.init_app(app)

    from .routes import main
    app.register_blueprint(main)

    return app
'''

with open('app/__init__.py', 'w') as f:
    f.write(init_content)

print("✅ Fixed app/__init__.py")

# Initialize database
from app import create_app, db
app = create_app()

with app.app_context():
    db.create_all()
    print("✅ Database initialized successfully!")
