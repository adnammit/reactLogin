import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, browserHistory } from 'react-router-dom';
import routes from './routes';
import App from './components/App';
import Greetings from './components/Greetings'; //swap for app
import SignupPage from './components/signup/SignupPage';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './rootReducer';

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
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
