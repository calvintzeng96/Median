from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import DataRequired, Length


class StoryForm(FlaskForm):
    REQUIRED_MESSAGE = '{} field is required.'
    title = StringField("Title", validators=[DataRequired(REQUIRED_MESSAGE.format(
        'title')), Length(max=200, message="Title must be less than 200 characters.")])
    image = StringField("Image", validators=[
                        DataRequired(REQUIRED_MESSAGE.format('image'))])
    content = StringField("Content", validators=[
        DataRequired(REQUIRED_MESSAGE.format('content'))])
