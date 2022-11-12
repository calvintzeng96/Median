from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User
from app.models import Story
from app.errors import NotFoundError

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()


# Get all Stories by a UserId
@user_routes.route("/<int:userId>/stories")
def all_user_stories(userId):
    stories = Story.query.filter(Story.user_id == int(userId)).all()
    return jsonify({"Stories": [story.to_dict() for story in stories]})


# Follow a User by id
@user_routes.route("/<int:userId>/followers")
def follow_user(userId):
    following = User.query.get(int(userId))
    if not following:
        return NotFoundError("User not found.")

    current_user.following.append(following)
    return {"message": "Successfully Followed", "statusCode": 201}
