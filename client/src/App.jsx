import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
    grey900
} from 'material-ui/styles/colors';

import Header from './components/Header';
import Map from './pages/Map';
import Help from './pages/Help';
import UserAccount from './pages/UserAccount';

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: grey900
    }
});

class App extends Component {

    render() {
        return (
            <Router>
                <MuiThemeProvider muiTheme={muiTheme}>
                    <div>
                        <Header />

                        <Route exact path="/" component={Map} />
                        <Route path="/help" component={Help} />
                        <Route path="/account" component={UserAccount} />
                        
                    </div>
                </MuiThemeProvider>
            </Router>
        );
    }
}

export default App;
