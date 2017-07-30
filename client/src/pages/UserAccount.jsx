import React, {Component} from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import CarIcon from 'material-ui/svg-icons/maps/directions-car';

class UserAccount extends Component {
    render() {
        return (
            <div style={{'margin': '25px'}}>
                <Card>
                    <CardHeader
                        title="Sample User"
                        subtitle="sampleuser@example.com"
                        avatar="https://s3.amazonaws.com/uifaces/faces/twitter/prrstn/128.jpg"
                    />

                    
                    <CardText>
                        <h1>Recent Activities</h1>
                        <List>
                            <ListItem leftIcon={<CarIcon />} primaryText="22 Woodland Drive" />
                            <ListItem leftIcon={<CarIcon />} primaryText="10 Jackson Street" />
                            <ListItem leftIcon={<CarIcon />} primaryText="300 Ivy Lane" />
                        </List>
                    </CardText>

                </Card>
            </div>
        );
    }
}

export default UserAccount;
