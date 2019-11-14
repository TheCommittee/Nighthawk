import React from "react";

const SignUpPage = props => {
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
      <div className="entrybutton" onClick={props.handleSignup}>
        Sign Up
      </div>
      <div className="entrybutton" onClick={props.loginButton}>
        Login Instead
      </div>
    </div>
  );
};

export default SignUpPage;
