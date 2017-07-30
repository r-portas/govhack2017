import React, {Component} from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';

import {HelpFooter} from '../components/Footer'
import Form from '../components/help/Form';
import Injuries from '../components/help/Injuries';
import * as $ from 'jquery';

export class HelpOld extends Component {

    onClick(e) {
        console.log('Clicked');
    }

    render() {
        return (
            <div>
                <Injuries onNextClicked={this.onClick}/>
            </div>
        );
    }    
}

export default class Help extends Component {

    onClick(e) {
        console.log('Clicked');
    }

    render() {
        return (
            <div>
                <Form/>
            </div>
        );
    }    
}
