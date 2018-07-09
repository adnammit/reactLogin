import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, browserHistory } from 'react-router-dom';
import routes from './routes.js';
import App from './components/App.js';
import Greetings from './components/Greetings.js'; //swap for app
import SignupPage from './components/signup/SignupPage.js';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

// // ReactDOM.render(<App />, document.getElementById('app'));
// ReactDOM.render(<Router history={browserHistory} routes={routes} />, document.getElementById('app'));


// ReactDOM.render(<Router history={browserHistory} routes={routes} />, document.getElementById('app'));
//
//
// ReactDOM.render(
//     <Router history={browserHistory} routes={routes} />,
//     document.getElementById('app')
// );
//


const store = createStore(
    (state = {}) => state,
    applyMiddleware(thunk)
);

ReactDOM.render((
    <Provider store={store}>
        <Router history={browserHistory}>
            <App>
                <Switch>
                    <Route exact path="/" component={Greetings} />
                    <Route path="/signup" component={SignupPage} />
                </Switch>
            </App>
        </Router>
    </Provider>
), document.getElementById('app')
);
