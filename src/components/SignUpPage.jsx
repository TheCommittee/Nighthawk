import React from "react";

const SignUpPage = props => {
  return (
    <div>
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
      <div className="button" onClick={props.handleSignup}>
        Sign Up
      </div>
    </div>
  );
};

export default SignUpPage;
