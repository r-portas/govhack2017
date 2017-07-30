import React from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';

const AboutMap = () => (
    <div style={{'margin': '25px'}}>
        <Card>
            <CardHeader
                title="About the map"
            />

            
            <CardText>
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
