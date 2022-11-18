import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  createComment,
  getAllComments,
  updateComment,
  deleteComment,
} from "../../store/comment";
import EditComment from "../EditComment";
import "./CreateCommentForm.css";

function CreateCommentForm({ story }) {
  const dispatch = useDispatch();
  const history = useHistory();
  // const {storyId} = useParams();
  const storyId = story.id;
  const user = useSelector((state) => state.session.user);

  // const story = useSelector(state => state.story.singleStory);
  const comment = useSelector((state) => state.comment.singleComment);
  const comments = useSelector((state) => state.comment.allComments);
  const commentsArr = Object.values(comments);

  const [dropdown, setDropdown] = useState(false);
  const [number, setNumber] = useState("");
  const [edit, setEdit] = useState(false);
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
  }, [content]);

  useEffect(() => {
    dispatch(getAllComments(storyId));
    setEdit(false);
  }, [dispatch, comment]);

  useEffect(() => {
    if (!dropdown) return;
    const closeDropdown = () => {
      setDropdown(false);
    };

    document.addEventListener("click", closeDropdown);
    return () => document.removeEventListener("click", closeDropdown);
  });

  const openDropdown = () => {
    if (dropdown) return setDropdown(false);
    setDropdown(true);
  };
  const closeDropdown = () => {
    // if (dropdown) return setDropdown(false)
    setDropdown(false);
  };

  const correctComment = (i) => {
    if (edit) return;
    setNumber(i);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!content.length) {
      setError("Comment can not be empty");
    }

    const data = { content };

    dispatch(createComment(storyId, data)).catch((e) =>
      e.json().then((e) => setError([e.errors]))
    );
    setContent("");
  };

  const deleteCommentClick = (commentId) => {
    dispatch(deleteComment(commentId));
  };

  const editCommentButton = (i) => {
    setEdit(true);
  };

  return (
    <div className="modal2-content">
      <div className="comment-container-all">
        <div className="comment-container-1">Responses</div>
        {error && <div id="create-comment-error">{error}</div>}
        <div className="comment-container-2">
          <div className="comment-container-2-1">
            <div className="comment-container-2-1-a">
              <img
                className="comment-container-2-1-a-1"
                src="https://media.istockphoto.com/id/1162198273/vector/question-mark-icon-flat-vector-illustration-design.jpg?s=612x612&w=0&k=20&c=MJbd8bw2iewJRd8sEkHxyGMgY3__j9MKA8cXvIvLT9E="
              />
              <div className="comment-container-2-1-a-2">
                {user.firstName} {user.lastName}
              </div>
            </div>
            <form onSubmit={handleSubmit} className="comment-container-2-1-b">
              <textarea
                className="comment-container-2-1-b-1"
                type="text"
                value={content}
                placeholder="What are your thoughts?"
                onChange={(e) => setContent(e.target.value)}
                // required
              />
              <button type="submit" className="comment-container-2-1-b-2">
                Respond
              </button>
            </form>
          </div>
        </div>

        <h3 id="comments-title">Comments</h3>
        <div className="comment-container-3">
          {commentsArr.map((comment, i) => {
            let dateReviewed = comment.created_at.slice(4, 17);
            if (!edit || i !== number) {
              return (
                <div
                  onClick={() => correctComment(i)}
                  className="individual-comment comment-container-3-all"
                >
                  {/* <div className="comment-container-3-1"> */}
                  <div className="comment-container-3-1">
                    <img
                      className="comment-container-2-1-a-1 comment-container-3-1-a"
                      src="https://media.istockphoto.com/id/1162198273/vector/question-mark-icon-flat-vector-illustration-design.jpg?s=612x612&w=0&k=20&c=MJbd8bw2iewJRd8sEkHxyGMgY3__j9MKA8cXvIvLT9E="
                    />
                    <div className="comment-container-3-1-b">
                      {dateReviewed}
                    </div>
                    <div className="comment-container-3-1-c">
                      {comment?.user?.firstName} {comment?.user?.lastName}
                    </div>
                    {user.id == comment.user_id && (
                      <button
                        className="comment-container-3-1-d"
                        onClick={() => openDropdown()}
                      >
                        ...
                      </button>
                    )}
                    {dropdown && user.id == comment.user_id && number == i && (
                      <div className="dropdown-content-123">
                        {/* <button
                          className="invisible"
                          onClick={() => closeDropdown()}
                        >
                          XD
                        </button> */}
                        <button onClick={() => editCommentButton(i)}>
                          Edit
                        </button>
                        <button onClick={() => deleteCommentClick(comment.id)}>
                          Delete
                        </button>
                      </div>
                    )}
                    {dropdown && user.id != comment.user_id && number == i && (
                      <div className="dropdown-content-123">
                        <button
                          className="invisible"
                          onClick={() => closeDropdown()}
                        >
                          XD
                        </button>
                        <button>This Button Does Nothing LOL</button>
                      </div>
                    )}
                  </div>
                  <div className="comment-container-3-2">
                    <div>{comment.content}</div>
                  </div>
                  {/* </div> */}
                  <div className="dropdown-button">
                    {/* <i onClick={() => openDropdown()} className="fa-solid fa-ellipsis"></i> */}
                  </div>
                </div>
              );
            } else if (edit && i == number) {
              return <EditComment comment={comment} />;
            }
          })}
        </div>
      </div>
    </div>
  );
}

export default CreateCommentForm;
