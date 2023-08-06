from flask import Blueprint

# Create the main Blueprint
colorRecognizer_bp = Blueprint('colorRecognizer', __name__, url_prefix="/color")

from . import recognizer
