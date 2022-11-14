import React, { useEffect, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUser } from "../../store/user";
import { storyReducer } from "../../store/story";
import UserInfo from "./userSideBar.js/UserInfo";

const Profile = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();

  const user = useSelector((state) => state.user.singleUser);
  const currUser = useSelector((state) => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(getUser(userId)).then(() => setIsLoaded(true));
  }, [userId, currUser]);

  if (isLoaded) {
    return (
      <div>
        <div>
          <h1>
            {user.firstName} {user.lastName}
          </h1>
        </div>
        <div>"Home"</div>
        <div className="middle-container">
          {user.Stories && (
            <ul>
              {user.Stories.map((story, idx) => {
                return <li key={idx}>{story.title}</li>;
              })}
            </ul>
          )}
        </div>
        <div className="right-container">
          <UserInfo />
        </div>
      </div>
    );
  }
  return (
    <div>
      <h1>"Loading..."</h1>
    </div>
  );
};

export default Profile;
