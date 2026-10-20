# Placeholder for Python script
import os
from datetime import datetime


def get_file_extension(filename):
    """
    Return the extension of a file.
    """
    return os.path.splitext(filename)[1].lower()


def is_allowed_file(filename, allowed_extensions):
    """
    Check if uploaded file type is allowed.
    """
    extension = get_file_extension(filename)
    return extension in allowed_extensions


def current_timestamp():
    """
    Return current date and time.
    """
    return datetime.now().strftime("%Y-%m-%d %H:%M:%S")


def calculate_percentage(part, total):
    """
    Calculate percentage safely.
    """
    if total == 0:
        return 0

    return round((part / total) * 100, 2)


def remove_duplicates(data):
    """
    Remove duplicate values from a list.
    """
    return list(dict.fromkeys(data))