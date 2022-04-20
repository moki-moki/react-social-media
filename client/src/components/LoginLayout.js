import { useContext, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { loginCall } from "./auth/apiCalls";
import { AuthContext } from "./context/AuthContext";
import NotificationFail from "./NotificationFail";
import { FormButton, FormControl, Input, SpanForm } from "./styles/FormStyles";
import { io } from "socket.io-client";

const LoginLayout = () => {
  const password = useRef();
  const email = useRef();
  const { error, dispatch } = useContext(AuthContext);
  const history = useHistory();

  const socket = useRef();

  socket.current = io("ws://localhost:5000");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginCall(
        {
          email: email.current.value,
          password: password.current.value,
        },
        dispatch
      );
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <FormControl onSubmit={(e) => handleLogin(e)}>
        <Input placeholder="Email" type="email" required ref={email} />

        <Input
          placeholder="Password"
          type="password"
          required
          minLength="6"
          ref={password}
        />
        <FormButton type="submit">LOGIN</FormButton>
        <SpanForm>
          Don't have an account? <Link to="/register">Register</Link>
        </SpanForm>
      </FormControl>
      {error ? <NotificationFail text={"Wrong Credentials..."} /> : null}
    </div>
  );
};

export default LoginLayout;
