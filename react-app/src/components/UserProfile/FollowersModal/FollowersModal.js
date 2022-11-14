import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserfollowers } from "../../../store/user";
import UserListModal from "./UserListModal";

const FollowersModal = () => {
  const dispatch = useDispatch();
  const followers = useSelector((state) => state.user.userList.Followers);
  const user = useSelector((state) => state.user.singleUser);
  const [page, setPage] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getUserfollowers(user.id, `${page}`, `10`)).then(() =>
      setIsLoaded(true)
    );
  }, []);

  const handlePagination = () => {
    dispatch(getUserfollowers(user.id, `${page + 1}`, "10")).then(() =>
      setPage(page + 1)
    );
  };

  if (isLoaded) {
    return (
      <div className="modal-content">
        <UserListModal followers={followers} />
        {followers && followers.length >= 10 && (
          <div>
            <button onClick={handlePagination}>Show more</button>
          </div>
        )}
      </div>
    );
  }
  return <h1>Loading....</h1>;
};

export default FollowersModal;
