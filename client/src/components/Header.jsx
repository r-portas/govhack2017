import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';

class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false
        };

        this.handleToggle = this.handleToggle.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleToggle() {
        this.setState({open: !(this.state.open)});
    }

    handleClose() {
        this.setState({open: false}); 
    }

    render() {
        return (
            <div>
                <Drawer 
                    docked={false}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({open})}
                >
                    <MenuItem containerElement={<Link to="/" />} onTouchTap={this.handleClose}>Home</MenuItem>
                    <MenuItem containerElement={<Link to="/test" />} onTouchTap={this.handleClose}>Test</MenuItem>
                    <MenuItem containerElement={<Link to="/map" />} onTouchTap={this.handleClose}>Map</MenuItem>
                </Drawer> 
                <AppBar onLeftIconButtonTouchTap={this.handleToggle} title="DriveSafely"/>
            </div>
        );
    }
}

export default Header;
