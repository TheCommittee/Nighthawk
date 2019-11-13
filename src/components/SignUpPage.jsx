import React from 'react';

const SignUpPage = (props) => {
    return ( 
        <div>
            <input type="text" name="formUsername" placeholder="Username" onChange={(e) => props.setInputValue(e)} required /><br />
            <input type="password" name="formPassword" placeholder="Password" onChange={(e) => props.setInputValue(e)} required /><br />
            <div class="button" onClick={ props.handleSignup }>Sign Up</div>
        </div>
     );
}
 
export default SignUpPage;