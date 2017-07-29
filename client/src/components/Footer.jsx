import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
// import FontIcon from 'material-ui/FontIcon';
import HelpIcon from 'material-ui/svg-icons/alert/error-outline';
import {fullWhite} from 'material-ui/styles/colors';
// import { Grid, Row, Col } from 'react-flexbox-grid';
import * as $ from 'jquery';
import { Link } from 'react-router-dom';

const style = {
  margin: 12
};

export default class Footer extends Component {
    componentDidMount() {
        window.$ = $;
    }

    render() {
        return <div className="footer">
            <RaisedButton
                icon={<HelpIcon />}
                className="btn-footer"
                style={style}
                primary={true}
                label="Help Me!"
                containerElement={<Link to="/help" />}
            />
        </div>;
    }
}

