
import React, { useEffect } from 'react';
import { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { ModalContext } from "../../context/Modal";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/session';
import "./index.css";
import homeIcon from "../../assets/home-icon.png"
import logo from "../../assets/main-logo.png"
import logo2 from "../../assets/main-logo-2.png"
import createNewStoryIcon from "../../assets/create-story-icon.png"
import { Redirect } from 'react-router-dom';


const NavBar = () => {
  const dispatch = useDispatch()
  const { setModalType } = useContext(ModalContext)
  const history = useHistory()
  const user = useSelector(state => state.session.user)

  const goHome = () => {
    if (window.location.pathname == "/") {
      window.location.reload(false)
    } else {
      history.push("/")
    }
    // window.location.reload(false)
  }

  const loggedIn = localStorage.getItem("logged")

  const logoutButton = (e) => {
    e.preventDefault()
    dispatch(logout()).then(() => {
      history.push("/")
    })
  }

  const newStoryRoute = () => {
    history.push("/story/new");
    // let app = document.getElementById("app-container")
    // app.removeChild(document.getElementById("container-1"))
  }


  if (window.location.href.includes("/story/new")) {
    return null
  }

  return (
    <div id={(loggedIn || user) ? "container-1" : "container-1-logged-out"}>
      <div id={(loggedIn || user) ? "container-1-inner" : "container-1-inner-logged-out"}>
        <div id={(loggedIn || user) ? "main-icon" : "main-icon-logged-out"}>
          <div id={(loggedIn || user) ? "img" : "img-logged-out"}>
            <img className="cursor" src={loggedIn ? logo2 : logo} onClick={goHome} width="36px" height="36px" />
          </div>
          {!loggedIn && (<div className="cursor" onClick={goHome} id="median">Median</div>)}

        </div>

        <div id="navbar-container">
          {!loggedIn
            ?
            <div id="navbar-logged-out">
              <div className="cursor" onClick={() => history.push("/team")}>Meet the Team</div>
              <div className="cursor" onClick={() => setModalType("Login")}>Sign In</div>
              <div className="cursor" id="get-started" onClick={() => setModalType("Signup")}>Get Started</div>
            </div>
            :
            <div id="navbar">
              <img className="cursor" src={homeIcon} alt="Home Icon" onClick={goHome} />
              <img className="cursor" src={createNewStoryIcon} alt="Create New Story" onClick={newStoryRoute} />
            </div>
          }
        </div>
        {loggedIn && user && (
          <div id="nav-bar-container-3">

            <button className="cursor" id="meet-the-team" onClick={() => history.push("/team")}>Meet the Team</button>
            <button className="cursor" id="profile-button" onClick={() => history.push(`/users/${user.id}`)}>profile</button>
            <button className="cursor" id="log-out-button" onClick={logoutButton}>Log Out</button>
          </div>

        )}
      </div>
    </div >
  );
}

export default NavBar;
