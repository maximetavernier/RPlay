import React from 'react';
import LoginForm from './login/loginForm';

export default class Login extends React.Component {
    render() {
        return (
            <div className="loginmodal-container">
                <h1>Login to Your Account</h1><br />
                <LoginForm />

                <div className="login-help">
                    <a href="#">Register</a> - <a href="#">Forgot Password</a>
                </div>
            </div>
        );
    }
}