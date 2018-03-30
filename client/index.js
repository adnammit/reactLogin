import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
// var createReactClass = require('create-react-class');
import webpackHotMiddleware from 'webpack-hot-middleware'; // for express
import App from './components/App';

ReactDOM.render(<App />, document.getElementById('app'));
