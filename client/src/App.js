import { useContext, useEffect, useState } from "react";
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
          {/* <Route path="/about">
            <About />
          </Route> */}
        </Switch>
      </ThemeProvider>
    </Router>
  );
}

export default App;
