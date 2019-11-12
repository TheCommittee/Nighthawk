import React from 'react';

const SignUpPage = ({ loginButton }) => {
    return ( 
        <div>
            <form action="/dbRouter/signup" method="POST">
                username: <input type="text" name="username" required/><br/>
                password: <input type="password" name="password" required/><br/>
                <input id="signup" type="submit" value="My body is ready."></input>
            </form>
        </div>
     );
}
 
export default SignUpPage;