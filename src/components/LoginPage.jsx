import React from "react";

const LoginPage = props => {
  return (
    <div className="loginItem">
      <input
        type="text"
        name="formUsername"
        placeholder="Username"
        onChange={e => props.setInputValue(e)}
        required
      />
      <br />
      <input
        type="password"
        name="formPassword"
        placeholder="Password"
        onChange={e => props.setInputValue(e)}
        required
      />
      <br />
      <div className="button" onClick={props.handleLogin}>
        Log In
      </div>
      {/* <button onClick={props.signupButton}>Sign-Up Here!</button> */}
    </div>
  );
};

export default LoginPage;
