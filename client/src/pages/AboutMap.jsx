import React from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';

const AboutMap = () => (
    <div style={{'margin': '25px'}}>
        <Card>
            <CardHeader
                title="About"
            />

            
            <CardText>
                <h3>About the project</h3>
                <p>
                    Drive Safely is a web based app for both mobile and desktop devices. It allows users to plan the safest route possible and assist them if they are in a roadside incident.
                </p>

                <p>
                    Drive Safely is designed for use by any driver in Brisbane, however its safety features make it most attractive to drivers who are unfamiliar with Brisbane roads and the Australian insurance process. This includes learner drivers, families with young children and cautious drivers.

                </p>

                <h3>Map</h3>
                <p>
                    The 3D map displays all traffic incidents at intersections in
                    the brisbane area.
                </p>

                <p>
                    Areas with tall hexagons have higher traffic incidents.
                </p>
            </CardText>

        </Card>
    </div>
);

export default AboutMap;
