import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { deleteStory } from "../../store/story";
import profileIcon from "../../assets/profile-icon.jpeg";
import "./GetAllStories.css";

const GetAllStories = ({ stories }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.session.user);
  const storiesArr = Object.values(stories);

  if (Object.keys(storiesArr).length === 0) {
    return null;
  }

  const deleteStoryHandler = (storyId) => {
    dispatch(deleteStory(storyId));
    history.push("/");
  };

  return (
    storiesArr && (
      <div className="stories-container">
        {storiesArr &&
          storiesArr.map((story) => {
            let contentPreview = story.content.slice(0,120) + "..."
            return (
              <>
                <div
                  className="stories-author-info cursor"
                  onClick={() => history.push(`/users/${story.author.id}`)}
                >
                  {/* {story.author.profile_picture}  */}
                  <img
                    className="profile-icon"
                    src={story.author.profile_picture}
                    alt="Profile Icon"
                  />
                  {story.author.firstName} {story.author.lastName} ·{" "}
                  {story.createdAt.slice(5, 11)}
                </div>
                <div className="stories-container2">
                  <div className="stories-info">
                    <NavLink key={story.id} to={`/stories/${story.id}`}>
                      <div className="stories-title">{story.title}</div>
                      <div className="stories-content">{contentPreview}</div>
                    </NavLink>
                    <div className="stories-buttons">
                      {user && user.id === story.user_id && (
                        <button
                          className="edit-story-button"
                          onClick={() =>
                            history.push(`/story/${story.id}/edit`)
                          }
                        >
                          Edit story
                        </button>
                      )}
                      {user && user.id === story.user_id && (
                        <button
                          className="delete-story-button"
                          onClick={() => deleteStoryHandler(story.id)}
                        >
                          Delete story
                        </button>
                      )}
                    </div>
                  </div>

                  <NavLink key={story.id} to={`/stories/${story.id}`}>
                    <div className="stories-image-container">
                      <img
                        className="stories-image"
                        src={story.image}
                        alt=""
                      />
                    </div>
                  </NavLink>
                </div>
                <div className="stories-divider"></div>
              </>
            );
          })}
      </div>
    )
  );
};

export default GetAllStories;
