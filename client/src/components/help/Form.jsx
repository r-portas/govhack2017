import React, {Component} from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import SwipeableViews from 'react-swipeable-views';
import RaisedButton from 'material-ui/RaisedButton';

import { Link } from 'react-router-dom';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import {fullWhite} from 'material-ui/styles/colors';
import * as $ from 'jquery';

const styles = {
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400
    },
    slide: {
        padding: 10,
    }
};

const style = {
  margin: 12
};

class Injuries extends Component {
    render() {
        return <div className="help-card"> 
            <Card>
                <CardText>  
                     <h2 className="help-h2"> Is anyone injured? </h2> 
                </CardText>

                <CardActions>
                    <RaisedButton primary={true} label="Next"/>
                </CardActions>
            </Card>
            <div className="footer">
                <RaisedButton
                    icon={<ArrowBack />}
                    className="btn-footer"
                    style={style}
                    primary={true}
                    label="Go Back"
                    containerElement={<Link to="/" />}
                />
             </div>
        </ div>;
    }
}

class Drivers extends Component {
    
}

class Witness extends Component {
    
}

class Evidence extends Component {
    
}

export default class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slideIndex: 0,
        };
    }

    componentDidMount() {
        $(window).resize();
    }
    
    handleChange = (value) => {
        this.setState({
            slideIndex: value,
        });
    }

    render() {
        return <div>
            <Tabs id="help-tabs"
            onChange={this.handleChange}
            value={this.state.slideIndex}
            >
                <Tab label="Tab One" value={0} />
                <Tab label="Tab Two" value={1} />
                <Tab label="Tab Three" value={2} />
            </Tabs>
            <SwipeableViews id="help-form-body"
            index={this.state.slideIndex}
            onChangeIndex={this.handleChange}
            >
                <div>
                    <Injuries />
                </div>
                <div style={styles.slide}>
                    
                </div>
                <div style={styles.slide}>
                    slide n°3
                </div>
            </SwipeableViews>
        </div>;
        }
}