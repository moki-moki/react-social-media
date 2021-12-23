import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { loginCall } from "./auth/apiCalls";
import { AuthContext } from "./context/AuthContext";
import NotificationFail from "./NotificationFail";
import { FormButton, FormControl, Input, SpanForm } from "./styles/FormStyles";

const LoginLayout = () => {
  const password = useRef();
  const email = useRef();
  const { user, error, dispatch } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    await loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };

  return (
    <div>
      <FormControl onSubmit={handleLogin}>
        <Input
          className="input"
          placeholder="Email"
          type="email"
          required
          className="loginInput"
          ref={email}
        />

        <Input
          className="input"
          placeholder="Password"
          type="password"
          required
          minLength="6"
          className="loginInput"
          ref={password}
        />
        <FormButton type="submit">LOGIN</FormButton>
        <SpanForm>
          Don't have an account? <Link to="/register">Register</Link>
        </SpanForm>
      </FormControl>
      {error ? <NotificationFail /> : null}
    </div>
  );
};

export default LoginLayout;
