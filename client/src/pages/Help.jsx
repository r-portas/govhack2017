import React, {Component} from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import Injuries from '../components/help/Injuries';

export default class Footer extends Component {

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
