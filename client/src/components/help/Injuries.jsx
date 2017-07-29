import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

const Injuries = (onNextClicked) => (
    <Card>
        <CardHeader
            title="Injuries"
        />

        <CardText>
            Is anyone injured?
        </CardText>

        <CardActions>
            <RaisedButton primary={true} label="Next" onTouchTap={onNextClicked}/>
        </CardActions>
    </Card>
);

export default Injuries;
