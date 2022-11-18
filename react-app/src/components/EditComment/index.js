import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllComments,
  testComment,
  updateComment,
} from "../../store/comment";
import "./EditComment.css";

const EditComment = ({ comment }) => {
  const dispatch = useDispatch();
  const commentId = comment.id;

  const [content, setContent] = useState(comment.content);
  const [error, setError] = useState("")

  const cancelButton = () => {
    dispatch(testComment());
  };

  useEffect(() => {
    setError("")
  }, [content])

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { content };
    if (!content.length) {
      setError("Comment can not be empty")
    }
    dispatch(updateComment(commentId, data))
  };

  return (
    <div className="comment-container-2-1">
      <div className="comment-container-2-1-a-lol"></div>
      {error && (<div id="edit-comment-error">{error}</div>)}
      <form onSubmit={handleSubmit} className="comment-container-2-1-b">
        {/* <div className="create_comment_form_header">
                    <div className="create_comment_form_title">Change Comment</div>
                </div> */}
        <textarea
          className="comment-container-2-1-b-1-lol"
          type="text"
          value={content}
          // placeholder="What are your thoughts?"
          onChange={(e) => setContent(e.target.value)}
          // required
        />
        <div className="edit-comment-buttons">
          <button
            type="button"
            onClick={() => cancelButton()}
            className="comment-container-2-1-b-2"
          >
            Cancel
          </button>
          <button type="submit" className="comment-container-2-1-b-2">
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditComment;
