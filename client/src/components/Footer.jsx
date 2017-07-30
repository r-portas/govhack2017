import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import HelpIcon from 'material-ui/svg-icons/alert/error-outline';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import {fullWhite} from 'material-ui/styles/colors';

// import FontIcon from 'material-ui/FontIcon';
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

export class HelpFooter extends Component {
    render() {
        return <div className="footer">
            <RaisedButton
                icon={<ArrowBack />}
                className="btn-footer"
                style={style}
                primary={true}
                label="Go Back"
                containerElement={<Link to="/" />}
            />
        </div>;
    }
}
