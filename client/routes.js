import React from 'react';
import { Route } from 'react-router-dom';
import App from './components/App.js';
import Greetings from './components/Greetings.js'; //swap for app

export default (
    <Route path="/" component={Greetings} />
)
