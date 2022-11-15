import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { createComment, getAllComments, updateComment, deleteComment } from '../../store/comment';
import EditComment from "../EditComment";
import './CreateCommentForm.css';

function CreateCommentForm({ story }) {
  const dispatch = useDispatch();
  const history = useHistory();
  // const {storyId} = useParams();
  const storyId = story.id
  const user = useSelector(state => state.session.user)

  // const story = useSelector(state => state.story.singleStory);
  const comment = useSelector(state => state.comment.singleComment);
  const comments = useSelector(state => state.comment.allComments);
  const commentsArr = Object.values(comments);

  const [dropdown, setDropdown] = useState(false)
  const [number, setNumber] = useState("")
  const [edit, setEdit] = useState(false)
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState([]);



  useEffect(() => {
    dispatch(getAllComments(storyId))
    setEdit(false)
    console.log("----------", storyId)
  }, [dispatch, comment]);

  useEffect(() => {
    if (!dropdown) return;
    const closeDropdown = () => {
      setDropdown(false)
    }
    console.log(number)
    document.addEventListener("click", closeDropdown);
    return () => document.removeEventListener("click", closeDropdown);
  })


  const openDropdown = () => {
    if (dropdown) return setDropdown(false)
    setDropdown(true)
  }

  const correctComment = (i) => {
    if (edit) return
    setNumber(i)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);

    const data = { content }

    // if (!content.length) {
    //   return setErrors(['Please provide a response.'])
    // }

    dispatch(createComment(storyId, data))
      .then(() => {
        alert("success")
      })
      .catch(() => alert("fail"))
    setContent("")
    console.log("----------------------2")
  };

  const deleteCommentClick = (commentId) => {
    dispatch(deleteComment(commentId))
  }

  const editCommentButton = (i) => {
    setEdit(true)
  }

  return (
    <div className="modal2-content">
      <div>
        <form onSubmit={handleSubmit} className="create_comment_form_container">
          <div className="create_comment_form_header">
            <div className="create_comment_form_title">Responses ()</div>
          </div>
          {/* <ul className="errors">
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
          ))}
        </ul> */}
          <textarea
            className="create_comment_form_input"
            type="text"
            value={content}
            placeholder="What are your thoughts?"
            onChange={(e) => setContent(e.target.value)}
          // required
          />
          <button type="submit" className="create_comment_respond_button">Respond</button>
        </form>

        <div className="all_comments">
          <h3>Comments</h3>
          {commentsArr.map((comment, i) => {
            if (!edit || i !== number) {
              return (
                <div onClick={() => correctComment(i)} className="border individual-comment">
                  <div>
                    <div>{comment.user_id}</div>
                    <div>{comment.content}</div>
                  </div>
                  <div className="dropdown-button">
                  {/* <i onClick={() => openDropdown()} className="fa-solid fa-ellipsis"></i> */}
                    <button onClick={() => openDropdown()}>Dropdown</button>
                    {dropdown && user.id == comment.user_id && number == i && (
                      <>
                        <button onClick={() => editCommentButton(i)}>Edit</button>
                        <button onClick={() => deleteCommentClick(comment.id)}>Delete</button>
                      </>
                    )}
                    {dropdown && user.id != comment.user_id && number == i && (
                      <div>other</div>
                    )}
                  </div>
                </div>
              )
            } else if (edit && i == number) {
              return (<EditComment comment={comment} />)
            }
          }

          )}
        </div>
      </div>
    </div>
  );
}

export default CreateCommentForm;
