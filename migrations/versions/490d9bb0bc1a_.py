"""empty message

<<<<<<<< HEAD:migrations/versions/6c8bee059cde_.py
Revision ID: 6c8bee059cde
Revises: 
Create Date: 2022-11-15 21:29:23.516369
========
Revision ID: 490d9bb0bc1a
Revises:
Create Date: 2022-11-16 14:03:24.815047
>>>>>>>> dev:migrations/versions/490d9bb0bc1a_.py

"""
from alembic import op
import sqlalchemy as sa
import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
<<<<<<<< HEAD:migrations/versions/6c8bee059cde_.py
revision = '6c8bee059cde'
========
revision = '490d9bb0bc1a'
>>>>>>>> dev:migrations/versions/490d9bb0bc1a_.py
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('username', sa.String(
                        length=40), nullable=False),
                    sa.Column('email', sa.String(length=255), nullable=False),
                    sa.Column('hashed_password', sa.String(
                        length=255), nullable=False),
                    sa.Column('first_name', sa.String(
                        length=200), nullable=False),
                    sa.Column('last_name', sa.String(
                        length=200), nullable=False),
                    sa.Column('profile_picture', sa.String(), nullable=True),
                    sa.Column('bio', sa.String(length=5000), nullable=True),
                    sa.Column('created_at', sa.DateTime(), nullable=False),
                    sa.PrimaryKeyConstraint('id'),
                    sa.UniqueConstraint('email'),
                    sa.UniqueConstraint('username')
                    )

    if environment == "production":
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")

    op.create_table('follows',
                    sa.Column('follower_id', sa.Integer(), nullable=True),
                    sa.Column('followed_id', sa.Integer(), nullable=True),
                    sa.ForeignKeyConstraint(['followed_id'], ['users.id'], ),
                    sa.ForeignKeyConstraint(['follower_id'], ['users.id'], )
                    )

    if environment == "production":
        op.execute(f"ALTER TABLE follows SET SCHEMA {SCHEMA};")

    op.create_table('stories',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('user_id', sa.Integer(), nullable=False),
                    sa.Column('title', sa.String(length=200), nullable=False),
                    sa.Column('image', sa.String(), nullable=True),
                    sa.Column('content', sa.Text(), nullable=False),
                    sa.Column('created_at', sa.DateTime(), nullable=False),
                    sa.Column('updated_at', sa.DateTime(), nullable=True),
                    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
                    sa.PrimaryKeyConstraint('id')
                    )

    if environment == "production":
        op.execute(f"ALTER TABLE stories SET SCHEMA {SCHEMA};")

    op.create_table('comments',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('user_id', sa.Integer(), nullable=False),
                    sa.Column('story_id', sa.Integer(), nullable=False),
                    sa.Column('content', sa.String(
                        length=500), nullable=False),
                    sa.Column('created_at', sa.DateTime(), nullable=False),
                    sa.ForeignKeyConstraint(['story_id'], ['stories.id'], ),
                    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
                    sa.PrimaryKeyConstraint('id')
                    )

    if environment == "production":
        op.execute(f"ALTER TABLE comments SET SCHEMA {SCHEMA};")

    op.create_table('likes',
                    sa.Column('user_id', sa.Integer(), nullable=False),
                    sa.Column('story_id', sa.Integer(), nullable=False),
                    sa.Column('count', sa.Integer(), nullable=True),
                    sa.Column('created_at', sa.DateTime(), nullable=False),
                    sa.ForeignKeyConstraint(['story_id'], ['stories.id'], ),
                    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
                    sa.PrimaryKeyConstraint('user_id', 'story_id')
                    )

    if environment == "production":
        op.execute(f"ALTER TABLE likes SET SCHEMA {SCHEMA};")
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('likes')
    op.drop_table('comments')
    op.drop_table('stories')
    op.drop_table('follows')
    op.drop_table('users')
    # ### end Alembic commands ###
