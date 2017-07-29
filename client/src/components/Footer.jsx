import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import AndroidIcon from 'material-ui/svg-icons/action/android';
import {fullWhite} from 'material-ui/styles/colors';
import { Grid, Row, Col } from 'react-flexbox-grid';

import * as $ from 'jquery';

const style = {
  margin: 12
};

export default class Footer extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        window.addEventListener('resize', this.resize); 
        this.resize();
        window.$ = $;
    }

    resize() {
        // const parentWidth = $(".footer").width();
        // console.log(Math.floor(parentWidth/2));
        // $(".btn-footer").width(Math.floor(parentWidth/2));

    }

    render() {
        return <div className="footer">
            <RaisedButton
                icon={<AndroidIcon />}
                className="btn-footer"
                style={style}
                primary={true}
                label="Help Me!"
            />
            <RaisedButton
                icon={<AndroidIcon color={fullWhite}/>}
                style={style}
                className="btn-footer"
                label="Map"
            />
        </div>;
    }
}

