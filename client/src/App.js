import { useContext, useState } from "react";
import { ThemeProvider } from "styled-components";
import { AuthContext } from "./components/context/AuthContext";

// Style
import GlobalStyles from "./components/styles/GlobalStyles";

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

// import theme from "./components/styles/theme";
import theme from "./components/styles/theme";

function App() {
  const { user, error } = useContext(AuthContext);
  const [themes, setThemes] = useState(
    JSON.parse(localStorage.getItem("theme")) || "dark"
  );

  return (
    <Router>
      <ThemeProvider theme={theme[themes]}>
        <GlobalStyles />

        {user ? (
          <Navbar themes={themes} setThemes={setThemes} user={user.user} />
        ) : null}
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
          <Route path="/profile/:username/:id">
            {user ? <Profile /> : <RegisterLayout />}
          </Route>
        </Switch>
        <Footer />
      </ThemeProvider>
    </Router>
  );
}

export default App;
