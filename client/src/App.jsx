import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
    grey900
} from 'material-ui/styles/colors';

import Header from './Header';
import Home from './pages/Home';
import Test from './pages/Test';

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

                        <Route exact path="/" component={Home} />
                        <Route path="/test" component={Test} />
                    </div>
                </MuiThemeProvider>
            </Router>
        );
    }
}

export default App;
