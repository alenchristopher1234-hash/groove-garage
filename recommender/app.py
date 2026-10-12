from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)  # allow the React app to call this service

db = MongoClient("mongodb://127.0.0.1:27017")["musicstore"]


@app.route("/recommend/<genre>")
def recommend(genre):
    """Return up to 3 albums of the same genre (skipping the one being viewed)."""
    exclude = request.args.get("exclude")
    results = []
    for p in db.products.find({"genre": genre}):
        if str(p["_id"]) == exclude:
            continue
        results.append({
            "_id": str(p["_id"]),
            "title": p["title"],
            "artist": p["artist"],
            "price": p["price"],
            "cover": p.get("cover", "🎵"),
        })
    return jsonify(results[:3])


if __name__ == "__main__":
    app.run(port=5001, debug=True)
