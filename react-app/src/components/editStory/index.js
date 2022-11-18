import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom";
import { getSingleStory, updateStory } from "../../store/story";
import './editStory.css';
import mainLogo from "../../assets/main-logo-2.png"

const EditStory = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { storyId } = useParams()

    const user = useSelector(state => state.session.user)
    const story = useSelector(state => state.story.singleStory)

    const [title, setTitle] = useState("")
    const [image, setImage] = useState("")
    const [content, setContent] = useState("")
    const [errors, setErrors] = useState([]);


    useEffect(() => {
        dispatch(getSingleStory(storyId))
    }, [])

    useEffect(() => {
            setTitle(story.title)
            setContent(story.content)
            setImage(story.image)
    }, [story])


    const submit = (e) => {
        e.preventDefault();
        setErrors([]);

        const data = { title, image, content }

        if (!data.title.length || data.title.length > 200) return setErrors(['Title can not be empty and it must be less than 200 characters.'])
        if (!data.image.length) return setErrors(['Image can not be empty.'])
        if (!data.image.includes('.jpg') && !data.image.includes('.jpeg') && !data.image.includes('.png')) return setErrors(['Image must be in .jpg, .jpeg, or .png format']);
        if (!data.content.length) return setErrors(['Content can not be empty.'])

        dispatch(updateStory(storyId, data))
            .then(() => {
                history.push(`/users/${user.id}`)
            })
    }

    return (
        <div className="edit-story-container">
            <div className="edit-story-header">
                <div className="header-left">
                    <img className="header-home-logo cursor" src={mainLogo} alt="Main Logo"
                        onClick={() => history.push('/')}/>
                    {user && <div className="header-author-info cursor">{user.firstName} {user.lastName}
                </div>}
                </div>
                <img className="header-profile-icon cursor" src={user.profile_picture} alt="Profile Icon"
                    onClick={() => history.push(`/users/${user.id}`)}/>
            </div>
            <div className="form-wrapper"></div>
                <form className="form-container" onSubmit={submit}>
                     <div className="errors">
                        {errors.length > 0 &&
                        errors.map((error) => <li key={error}>{error}</li>)}
                    </div>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        // placeholder={story.title}
                        className="input-title"
                    />
                    <input
                        type="text"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        // placeholder={story.image}
                        className="input-image"
                    />
                    <textarea
                        className="edit-story-textarea"
                        type="text"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        // placeholder={story.content}
                    />
                    <button className="editStory-button" type="submit">Save and publish</button>
                </form>
            </div>
    )
}

export default EditStory
