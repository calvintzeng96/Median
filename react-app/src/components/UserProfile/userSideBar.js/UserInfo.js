import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useContext } from "react";
import { loadFollowings } from "../../../store/user";
import { ModalContext } from "../../../context/Modal";
import { followThunk } from "../../../store/user";
import { getUser } from "../../../store/user";

import "./UserInfo.css";

const UserInfo = ({ userId }) => {
  let user = useSelector((state) => state.user.singleUser);
  const followings = useSelector((state) => state.user.userList.Followings);
  const dispatch = useDispatch();
  const [isLoaded, setisLoaded] = useState(false);
  const { setModalType } = useContext(ModalContext);

  console.log("FOLLOWINGS ", followings);

  useEffect(() => {
    dispatch(loadFollowings(userId, "1", "5"))
      .then(() => getUser(userId))
      .then(() => setisLoaded(true));
  }, [userId]);

  const showFollowerModal = () => {
    setModalType("Followers");
  };

  const showFollowingModal = () => {
    setModalType("Following");
  };

  const handleFollow = () => {
    console.log("USER ", user);
    user = dispatch(followThunk(userId)).then(() =>
      dispatch(getUser(userId)).then((res) => res)
    );
  };

  if (isLoaded) {
    return (
      <div className="container-content">
        <div className="profile-picture">
          <img src={user.profile_picture} />
        </div>
        <div className="profile-header">
          <div className="main-header">
            {user.firstName} {user.lastName}
          </div>
          <div className="follow-count">
            <button onClick={showFollowerModal}>
              {user.followerCount} Followers
            </button>
          </div>
        </div>
        <div className="bio">{user.bio}</div>
        <div className="action-btns">
          <button onClick={handleFollow}>Follow</button>
        </div>
        <div className="following-peak">
          <h3>Following</h3>
          <div className="following-list">
            <ul>
              {followings.map((following, idx) => {
                return (
                  <li key={idx}>
                    {following.firstName} {following.lastName}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="expand-following">
            <button onClick={showFollowingModal}>
              See all ({user.followingCount})
            </button>
          </div>
        </div>
      </div>
    );
  }
  return <h1>Loading...</h1>;
};

export default UserInfo;
