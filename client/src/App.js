import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import AppBar from 'material-ui/AppBar';

class App extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <AppBar title="GovHack2017" />
            </MuiThemeProvider>
        );
    }
}

export default App;
