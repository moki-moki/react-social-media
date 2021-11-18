export const LoginStart = (userCredentials) => ({
  type: "LOGIN",
});

export const LoginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});

export const LoginFail = (error) => ({
  type: "LOGIN_FAIL",
  payload: error,
});
