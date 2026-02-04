from flask import Blueprint, request, jsonify
from . import db
from datetime import datetime

main = Blueprint("main", __name__)

class ChronicleEntry(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    author = db.Column(db.String(100), nullable=False)
    intent = db.Column(db.String(100), nullable=False)

@main.route("/entries", methods=["GET"])
def get_entries():
    entries = ChronicleEntry.query.order_by(ChronicleEntry.timestamp.desc()).all()
    return jsonify([{
        "id": e.id,
        "text": e.text,
        "timestamp": e.timestamp.isoformat(),
        "author": e.author,
        "intent": e.intent
    } for e in entries])

@main.route("/entries", methods=["POST"])
def add_entry():
    data = request.get_json()
    entry = ChronicleEntry(
        text=data["text"],
        author=data["author"],
        intent=data["intent"]
    )
    db.session.add(entry)
    db.session.commit()
    return jsonify({"success": True}), 201
