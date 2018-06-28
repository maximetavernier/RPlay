import React from 'react';
import axios from 'axios';

export default class LoginForm extends React.Component {
    onSubmit(e: any) {
        e.preventDefault();

        let username = e.target.username.value,
            password = e.target.password.value;
        axios.post('/access/login', { username, password }).then((response) => {
            if (response.status === 200) {
                var auth = response.headers['authorization'];

                document.cookie = `authToken=${auth}`;
                location.reload(true);
            }
        }).catch((err) => {

        });
    }

    render() {
        return (
            <form onSubmit={this.onSubmit.bind(this)}>
                <input type="text" ref="username" name="username" placeholder="Username" autoComplete="username" />
                <input type="password" ref="password" name="password" placeholder="Password" autoComplete="current-password" />
                <input type="submit" name="login" className="loginmodal-submit" value="Login" />
            </form>
        );
    }
}