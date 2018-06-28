import React from 'react';
import ReactDOM from 'react-dom';
// import PropTypes from 'prop-types';
// var createReactClass = require('create-react-class');
// import webpackHotMiddleware from 'webpack-hot-middleware'; // for express
// import { Router, browserHistory } from 'react-router';

import { BrowserRouter as Router, Route, Switch, browserHistory } from 'react-router-dom';
import routes from './routes';
import App from './components/App.js';
import Greetings from './components/Greetings.js'; //swap for app

// // ReactDOM.render(<App />, document.getElementById('app'));
// ReactDOM.render(<Router history={browserHistory} routes={routes} />, document.getElementById('app'));


ReactDOM.render((
    <Router>
        <App>
            <Switch>
                <Route exact path="/" component={Greetings} />
            </Switch>
        </App>
    </Router>
), document.getElementById('app')
);
