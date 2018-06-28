'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import App from './components/app';
import Login from './components/login';

(() => {
    axios.get('/access/authorization').then((response: any) => {
        ReactDOM.render(<App />, document.getElementById('app'));
    }).catch((_reject: any) => {
        document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        ReactDOM.render(<Login />, document .getElementById('app'));
    });
})();