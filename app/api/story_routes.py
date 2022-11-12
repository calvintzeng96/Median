from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from ..models import Story, User
from ..errors import NotFoundError, ForbiddenError
from ..forms.story_form import StoryForm
from ..models import db
from datetime import datetime
from .helpers import child_belongs_to_parent
story_routes = Blueprint('stories', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field}:{error}')
    return errorMessages


@story_routes.route('/')
def all_stories():
    stories = Story.query.all()
    print(stories)
    if not stories:
        return NotFoundError("No stories found.")

    return jsonify([story.to_dict() for story in stories])


@story_routes.route('/', methods=["POST"])
@login_required
def create_story():
    form = StoryForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_story = Story(user=current_user,
                          title=form.data['title'],
                          image=form.data['image'],
                          content=form.data['content'],
                          created_at=datetime.now())
        db.session.add(new_story)
        db.session.commit()
        return jsonify(new_story.to_dict_no_relations())
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401


@story_routes.route('/<int:story_id>', methods=["PUT", "PATCH"])
@login_required
def edit_story(story_id):
    form = StoryForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit:
        update_data = form.data
        del update_data['csrf_token']
        if update_data.get('submit'):
            del update_data['submit']

        story = Story.query.get(story_id)
        try:
            child_belongs_to_parent(User.query.get(
                current_user.id), story, 'user_id')
        except ForbiddenError as e:
            return {"error": e.message}, e.status_code

        for key, value in update_data.items():
            setattr(story, key, update_data[key])
        db.session.commit()
        return jsonify(story.to_dict_no_relations())
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401


@story_routes.route('/<int:story_id>', methods=["DELETE"])
@login_required
def delete_story(story_id):
    story = Story.query.get(story_id)

    try:
        child_belongs_to_parent(current_user, story, 'user_id')
    except ForbiddenError as e:
        return {"error": e.message}, e.status_code

    db.session.delete(story)
    db.session.commit()
    return {"message": f"Story {story_id} successfully deleted.", "statusCode": 200}
