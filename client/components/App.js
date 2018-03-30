import React from 'react';
import Greetings from './Greetings.js';

// in order for dynamic updating to occur, the top component 'App' must be a class component. It's sub components may be functional. If this were functional, like 'Greetings', it would not dynamically load (though I think functional components now can as well)
class App extends React.Component {
    render () {
        return (
            <Greetings />
            // <div><h1>Hello from react!</h1><p>I would like to tell you how glad I am to be here.<br/>And I <i>love</i> those pants!</p><p>AAAAAANNNNND THAT SHAT!</p></div>
        );
    }
}

export default App;


