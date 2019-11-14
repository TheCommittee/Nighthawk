import React from "react";

const LoginPage = props => {
  return (
    <div className="entryitems">
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
      <div className="entrybutton" onClick={props.handleLogin}>
        Log In
      </div>
      <div className="entrybutton" onClick={props.signupButton}>
        Sign Up Instead
      </div>
    </div>
  );
};

export default LoginPage;
