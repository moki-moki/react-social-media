export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN" });

  const myInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: userCredential.email,
      password: userCredential.password,
    }),
  };

  try {
    const res = await fetch("/auth/login", myInit);
    const data = await res.json();
    dispatch({ type: "LOGIN_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "LOGIN_FAIL", payload: error });
  }
};
