import React from 'react';

const LoginPage = (props) => {
    return ( 
        <div>
            <input type="text" name="formUsername" placeholder="Username" onChange={ (e) => props.setInputValue(e) } required/><br/>
            <input type="password" name="formPassword" placeholder="password" onChange={ (e) => props.setInputValue(e) } required/><br/>
            <div class="button" onClick={ props.setInputValue }>Submit</div>
            <button onClick={ props.signupButton }>Sign-Up Here!</button>
        </div>
     );
}
 
export default LoginPage;