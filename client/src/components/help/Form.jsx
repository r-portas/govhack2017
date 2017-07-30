import React, {Component} from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import SwipeableViews from 'react-swipeable-views';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import UploadPreview from 'material-ui-upload/UploadPreview';
import Upload from 'material-ui-upload/Upload';

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

class DriverForm extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>
            <form id='form-driver'>
                <TextField
                errorText="This field is required"
                floatingLabelText="First Name"
                name="fname"
                /><br />
                <TextField
                errorText="This field is required"
                floatingLabelText="Last Name"
                name="lname"
                /><br />
                <TextField
                errorText="This field is required"
                floatingLabelText="Contact Number"
                type="number"
                name="mobile"
                /><br />
                <TextField
                errorText="This field is required"
                floatingLabelText="License Plate"
                name="lplate"
                /><br />
                <TextField
                errorText="This field is required"
                floatingLabelText="Registration"
                name="rego"
                /><br />
                <TextField
                errorText="This field is required"
                floatingLabelText="Vehicle Model"
                name="model"
                /><br />
            </form>
            <div className="footer help-form-actions">
                <RaisedButton label="Cancel" onTouchTap={this.props.previousState} primary={true} style={style}/>
                <RaisedButton label="Save" onTouchTap={this.props.nextState} primary={true} style={style}/>

            </div>
        </div>
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

class WitnessForm extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>
            <form id='form-driver'>
                <TextField
                errorText="This field is required"
                floatingLabelText="First Name"
                name="fname"
                /><br />
                <TextField
                errorText="This field is required"
                floatingLabelText="Last Name"
                name="lname"
                /><br />
                <TextField
                errorText="This field is required"
                floatingLabelText="Contact Number"
                type="number"
                name="mobile"
                /><br />
            </form>
            <div className="footer help-form-actions">
                <RaisedButton label="Cancel" onTouchTap={this.props.previousState} primary={true} style={style}/>
                <RaisedButton label="Save" onTouchTap={this.props.nextState} primary={true} style={style}/>

            </div>
        </div>
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

class EvidenceForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pictures: {}
        };
    }

    onFileLoad = (e, file) => console.log(e.target.result, file.name);

    render() {
        return <div className="help-card"> 
            <h2 >Add Evidence</h2>
            <input multiple="multiple" type="file" accept="image/*" capture="camera" />

            <div className="footer help-form-actions">
                <RaisedButton label="Cancel" onTouchTap={this.props.previousState} primary={true} style={style}/>
                <RaisedButton label="Save" onTouchTap={this.props.nextState} primary={true} style={style}/>
            </div>
        </div>    
    }
}

class SaveForm extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="help-card"> 
            <Card className="help-card-container">
                <CardText>  
                     <h2 className="help-h2"> Submit Form? </h2> 
                </CardText>

                <CardActions className="help-card-actions">
                    <RaisedButton primary={true} label="Yes" containerElement={<Link to="/" />}/>
                    <RaisedButton primary={true} label="No" containerElement={<Link to="/" />}/>
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

    driversAcceptState() {
        this.handleChange(5);
    }

    witnessPreviousState() {
        this.handleChange(1);
    }

    witnessNextState() {
        this.handleChange(3);
    }

    witnessAcceptState() {
        this.handleChange(6);
    }

    evidencePreviousState() {
        this.handleChange(2);
    }

    evidenceNextState() {
        this.handleChange(4);
    }

    evidenceAcceptState() {
        this.handleChange(7);
    }

    savePreviousState() {
        this.handleChange(3);
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
                <div className="full-width">
                    <Injuries 
                    nextState={this.injuriesNextState.bind(this)} 
                    />
                </div>
                <div className="full-width">
                    <Drivers 
                    previousState={this.driversPreviousState.bind(this)}
                    nextState={this.driversNextState.bind(this)} 
                    acceptState={this.driversAcceptState.bind(this)} 
                    />
                </div>
                <div className="full-width">
                    <Witness 
                    previousState={this.witnessPreviousState.bind(this)}
                    nextState={this.witnessNextState.bind(this)} 
                    acceptState={this.witnessAcceptState.bind(this)} 
                    />
                </div>
                <div className="full-width">
                    <Evidence 
                    previousState={this.evidencePreviousState.bind(this)}
                    nextState={this.evidenceNextState.bind(this)} 
                    acceptState={this.evidenceAcceptState.bind(this)} 
                    />
                </div>
                <div className="full-width">
                    <SaveForm 
                    previousState={this.witnessNextState.bind(this)}
                    />
                </div>
                <DriverForm 
                previousState={this.witnessPreviousState.bind(this)}
                nextState={this.driversNextState.bind(this)} 
                />

                <WitnessForm 
                previousState={this.evidencePreviousState.bind(this)}
                nextState={this.witnessNextState.bind(this)} 
                />

                <EvidenceForm 
                previousState={this.savePreviousState.bind(this)}
                nextState={this.evidenceNextState.bind(this)} 
                />
            </SwipeableViews>
        </div>;
        }
}