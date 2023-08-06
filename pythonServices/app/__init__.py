from flask import Flask, jsonify, request

def create_app():
    app = Flask(__name__)

    # Import and register the main Blueprint
    from .colorRecognizer import colorRecognizer_bp
    app.register_blueprint(colorRecognizer_bp)

    return app
