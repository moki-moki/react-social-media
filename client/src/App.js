import { useContext, useState } from "react";
import { ThemeProvider } from "styled-components";
import { AuthContext } from "./components/context/AuthContext";

// Style
import GlobalStyles from "./components/styles/GlobalStyles";

// Routing
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
import ChatWindow from "./components/ChatWindow";

function App() {
  const { user, error } = useContext(AuthContext);
  const [themes, setThemes] = useState(
    JSON.parse(localStorage.getItem("theme")) || "dark"
  );

  return (
    <Router>
      <ThemeProvider theme={theme[themes]}>
        <GlobalStyles />

        <Navbar themes={themes} setThemes={setThemes} user={user} />

        <Switch>
          <Route exact path="/">
            <HomepageLayout />
          </Route>
          <Route path="/login">
            <LoginLayout />
          </Route>
          <Route path="/register">
            <RegisterLayout />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/createPost">
            <CreatePost />
          </Route>
          <Route path="/posts/:id">
            <SinglePost />
          </Route>
          <Route path="/profile/:username/:id">
            <Profile />
          </Route>
          <Route path="/chat">
            <ChatWindow />
          </Route>
        </Switch>
        <Footer />
      </ThemeProvider>
    </Router>
  );
}

export default App;
