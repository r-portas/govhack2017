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
        padding: 0,
    }
};

const style = {
  margin: 12
};

class Injuries extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return <div className="help-card"> 
            <Card className="help-card-container">
                <CardText>  
                     <h2 className="help-h2"> Is anyone injured/trapped? </h2> 
                </CardText>

                <CardActions className="help-card-actions">
                    <RaisedButton primary={true} href="tel:000" label="Yes"/>
                    <RaisedButton primary={true} label="No" onTouchTap={this.props.nextState}/>
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
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="help-card"> 
            <Card className="help-card-container">
                <CardText>  
                     <h2 className="help-h2"> Is another vehicle involved? </h2> 
                </CardText>

                <CardActions className="help-card-actions">
                    <RaisedButton primary={true} label="Yes" onTouchTap={this.props.acceptState}/>
                    <RaisedButton primary={true} label="No" onTouchTap={this.props.nextState}/>
                </CardActions>
            </Card>
            <div className="footer">
                <RaisedButton
                    icon={<ArrowBack />}
                    className="btn-footer"
                    style={style}
                    primary={true}
                    label="Go Back"
                    onTouchTap={this.props.previousState}
                />
             </div>
        </ div>;
    }
}

class Witness extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="help-card"> 
            <Card className="help-card-container">
                <CardText>  
                     <h2 className="help-h2"> Is there a Witness? </h2> 
                </CardText>

                <CardActions className="help-card-actions">
                    <RaisedButton primary={true} label="Yes" onTouchTap={this.props.acceptState}/>
                    <RaisedButton primary={true} label="No" onTouchTap={this.props.nextState}/>
                </CardActions>
            </Card>
            <div className="footer">
                <RaisedButton
                    icon={<ArrowBack />}
                    className="btn-footer"
                    style={style}
                    primary={true}
                    label="Go Back"
                    onTouchTap={this.props.previousState}
                />
             </div>
        </ div>;
    }
}

class Evidence extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="help-card"> 
            <Card className="help-card-container">
                <CardText>  
                     <h2 className="help-h2"> Add Evidence? </h2> 
                </CardText>

                <CardActions className="help-card-actions">
                    <RaisedButton primary={true} label="Yes" onTouchTap={this.props.acceptState}/>
                    <RaisedButton primary={true} label="No" onTouchTap={this.props.nextState}/>
                </CardActions>
            </Card>
            <div className="footer">
                <RaisedButton
                    icon={<ArrowBack />}
                    className="btn-footer"
                    style={style}
                    primary={true}
                    label="Go Back"
                    onTouchTap={this.props.previousState}
                />
             </div>
        </ div>;
    }
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
            slideIndex: value
        });
        $(window).resize();
    }

    injuriesNextState() {
        this.handleChange(1);
    }
    
    driversPreviousState() {
        this.handleChange(0);
    }

    driversNextState() {
        this.handleChange(2);
    }

    witnessPreviousState() {
        this.handleChange(1);
    }

    witnessNextState() {
        this.handleChange(3);
    }

    evidencePreviousState() {
        this.handleChange(2);
    }

    evidenceNextState() {
        this.handleChange(4);
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
                    <Injuries 
                    nextState={this.injuriesNextState.bind(this)} 
                    />
                </div>
                <div>
                    <Drivers 
                    previousState={this.driversPreviousState.bind(this)}
                    nextState={this.driversNextState.bind(this)} 
                    />
                </div>
                <div>
                    <Witness 
                    previousState={this.witnessPreviousState.bind(this)}
                    nextState={this.witnessNextState.bind(this)} 
                    />
                </div>
                <div>
                    <Evidence 
                    previousState={this.evidencePreviousState.bind(this)}
                    nextState={this.evidenceNextState.bind(this)} 
                    />
                </div>
                <div>
                    Save this
                </div>
            </SwipeableViews>
        </div>;
        }
}