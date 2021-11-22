import { Profiler, useContext, useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { AuthContext } from "./components/context/AuthContext";

// Style
import GlobalStyles from "./components/styles/GlobalStyles";
import theme from "./components/styles/theme";

// Routing
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import LoginLayout from "./components/LoginLayout";
import RegisterLayout from "./components/RegisterLayout";
import HomepageLayout from "./components/HomepageLayout";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Footer from "./components/Footer";
import CreatePost from "./components/CreatePost";
import SinglePost from "./components/SinglePost";
import Profile from "./components/Profile";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <GlobalStyles />

        {user ? <Navbar user={user.user} /> : null}
        <Switch>
          <Route exact path="/">
            {user ? <HomepageLayout /> : <LoginLayout />}
          </Route>
          <Route path="/login">
            {user ? <Redirect to="/" /> : <LoginLayout />}
          </Route>
          <Route path="/register">
            {user ? <Redirect to="/" /> : <RegisterLayout />}
          </Route>
          <Route path="/about">{user ? <About /> : <RegisterLayout />}</Route>
          <Route path="/createPost">
            {user ? <CreatePost /> : <RegisterLayout />}
          </Route>
          <Route path="/posts/:id">
            {user ? <SinglePost /> : <RegisterLayout />}
          </Route>
          <Route path="/profile/:username">
            {user ? <Profile /> : <RegisterLayout />}
          </Route>
        </Switch>
        <Footer />
      </ThemeProvider>
    </Router>
  );
}

export default App;
