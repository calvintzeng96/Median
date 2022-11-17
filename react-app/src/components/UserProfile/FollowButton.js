import {
  followsUser,
  followThunk,
  unfollowThunk,
  getUser,
} from "../../store/user";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useContext } from "react";
import { ModalContext } from "../../context/Modal";
import { useParams } from "react-router-dom";

const FollowButton = ({ userId, idx, profileId }) => {
  console.log("RENDERING FOLLOW BTN");
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const { setModalType } = useContext(ModalContext);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    followsUser(userId).then((res) => setIsFollowing(res));
  }, []);

  const handleFollow = () => {
    if (!currentUser) {
      setModalType("Login");
      return;
    }
    dispatch(followThunk(userId))
      .then(() => followsUser(userId))
      .then((res) => setIsFollowing(res))
      .then(() => {
        console.log("PROFILE ID ", profileId);
        if (profileId) dispatch(getUser(profileId)).then((res) => res);
      });

    // if (profile) {
    //   console.log("PROFILE GETTING USER");
    //   .then((res) => res);
    // }
  };

  const handleUnfollow = () => {
    dispatch(unfollowThunk(userId))
      .then(() => followsUser(userId))
      .then((res) => setIsFollowing(res))
      .then(() => {
        if (profileId) dispatch(getUser(profileId)).then((res) => res);
      });

    // if (profile) {
    //  .then((res) => res);
    // }
  };

  return (
    <div className="action-btns">
      {isFollowing && currentUser && userId != currentUser.id && (
        <button className="unfollow" key={idx} onClick={handleUnfollow}>
          Unfollow
        </button>
      )}
      {!isFollowing && currentUser && userId != currentUser.id && (
        <button className="follow-btn" onClick={handleFollow} key={idx}>
          Follow
        </button>
      )}
      {!currentUser && (
        <button className="follow-btn" onClick={handleFollow} key={idx}>
          Follow
        </button>
      )}
    </div>
  );
};

export default FollowButton;
