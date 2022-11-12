from .db import db
from datetime import datetime


class Story(db.Model):
    __tablename__ = "stories"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    title = db.Column(db.String(200), nullable=False)
    image = db.Column(db.String)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

    user = db.relationship("User", back_populates="stories")
    comments = db.relationship("Comment", back_populates="story")
    likes = db.relationship("Like", back_populates="story")

    def to_dict(self):
        return {"id": self.id, "user_id": self. user_id,
                "title": self.title, "image": self.image, "content": self.content, "createdAt": self.created_at,
                'author': self.user.to_dict(), 'likeCount': len(self.likes), 'commentCount': len(self.comments)}
