import "./UserListModal.css";
import FollowListUser from "./FollowListUser";
import { useContext } from "react";
import { ModalContext } from "../../../context/Modal";

const UserListModal = ({ followers, following }) => {
  const followData = followers ? followers : following;
  const title = followers ? "Followers" : "Following";
  const {setModalType} = useContext(ModalContext)

  return (
    <div className="follow-data-content">
      <div id="follow-data-title">{title}</div>
      <div id="x-container">
      <div id="x" className="cursor" onClick={() => setModalType(null)}>x</div>
      </div>
      <ul id="follow-data">
        {followData.map((user, idx) => (
          <FollowListUser user={user} idx={idx} />
        ))}
      </ul>
    </div>
  );
};

export default UserListModal;
