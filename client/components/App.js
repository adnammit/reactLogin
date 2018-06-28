import React from 'react';
// import Greetings from './Greetings.js';
import NavigationBar from './NavigationBar';

// in order for dynamic updating to occur, the top component 'App' must be a class component. It's sub components may be functional. If this were functional, like 'Greetings', it would not dynamically load (though I think functional components now can as well)
class App extends React.Component {
    render () {
        return (
            // <div className="container">
            //     <NavigationBar />
            // </div>
            // <Greetings />
            <div><h1>Hello! Welcome to Mars!</h1>
            <p>Please enjoy our gravity.</p></div>
        );
    }
}

export default App;
