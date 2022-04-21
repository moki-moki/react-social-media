import { useContext, useEffect, useRef, useState } from "react";
import { ThemeProvider } from "styled-components";
import { AuthContext } from "./components/context/AuthContext";
import { io } from "socket.io-client";

// Style
import GlobalStyles from "./components/styles/GlobalStyles";

// Routing
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
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
import ChatWindow from "./components/ChatWindow";

function App() {
  const { user } = useContext(AuthContext);

  const [themes, setThemes] = useState(
    JSON.parse(localStorage.getItem("theme")) || "dark"
  );

  const socket = useRef();

  socket.current = io("ws://localhost:5000");

  useEffect(() => {
    socket.current.emit("getUser", user);

    socket.current.emit("addUser", user?.user._id, user?.user.username);
  }, [user]);

  return (
    <Router>
      <ThemeProvider theme={theme[themes]}>
        <GlobalStyles />

        <Navbar
          socket={socket}
          themes={themes}
          setThemes={setThemes}
          user={user}
        />

        <Switch>
          <Route exact path="/">
            <HomepageLayout socket={socket} />
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
            <SinglePost socket={socket} />
          </Route>
          <Route path="/profile/:username/:id">
            <Profile />
          </Route>
          <Route path="/chat">
            {user ? <ChatWindow socket={socket} /> : <Redirect to="/login" />}
          </Route>
        </Switch>
        <Footer />
      </ThemeProvider>
    </Router>
  );
}

export default App;
