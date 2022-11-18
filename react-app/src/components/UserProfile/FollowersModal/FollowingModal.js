import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadFollowings } from "../../../store/user";
import UserListModal from "./UserListModal";

const FollowingModal = () => {
  const dispatch = useDispatch();
  const following = useSelector((state) => state.user.userList.Followings);
  const user = useSelector((state) => state.user.singleUser);
  const [isLoaded, setIsLoaded] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(loadFollowings(user.id, `${page}`, "10")).then(() =>
      setIsLoaded(true)
    );
  }, []);

  const handlePagination = () => {
    dispatch(loadFollowings(user.id, `${page + 1}`, "10")).then(() =>
      setPage(page + 1)
    );
  };

  if (isLoaded) {
    return (
      <div className="modal-content follow">
        <UserListModal following={following} />
        {following && following.length >= 10 && (
            <button className="cursor show-more-button" onClick={handlePagination}>Show more</button>
        )}
      </div>
    );
  }
  return <h1>Loading....</h1>;
};

export default FollowingModal;
