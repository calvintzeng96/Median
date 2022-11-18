import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "./components/NavBar";
import { authenticate } from "./store/session";
import "./App.css";

import Home from "./components/home";
import GetOneStory from "./components/GetOneStory/GetOneStory";
import Profile from "./components/UserProfile/profile";
import CreateStory from "./components/createStory";
import CreateCommentForm from "./components/CreateCommentModal/CreateCommentForm";
import EditStory from "./components/editStory";
import Team from "./components/Team";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    dispatch(authenticate()).then(() => {
      setLoaded(true)
    });
  }, [dispatch]);

  if (!loaded) return null

  return (
    <div id={user ? "app-container" : "app-container-logged-out"}>
      <Switch>
        <Route exact path="/">
          <NavBar />
          <Home />
        </Route>
        <Route path="/stories/:storyId">
          <NavBar />
          <GetOneStory />
        </Route>
        <Route path="/users/:userId">
          <NavBar />
          <Profile />
        </Route>
        <Route path="/story/new">
          <CreateStory />
        </Route>
        <Route path="/story/:storyId/edit">
          <EditStory />
        </Route>
        <Route path="/team">
          <Team />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
