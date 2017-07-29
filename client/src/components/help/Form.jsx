import React, {Component} from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import SwipeableViews from 'react-swipeable-views';
import RaisedButton from 'material-ui/RaisedButton';


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

export default class TabsExampleSwipeable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slideIndex: 0,
        };
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
            <SwipeableViews
            index={this.state.slideIndex}
            onChangeIndex={this.handleChange}
            >
                <div>
                    <h2 style={styles.headline}>Tabs with slide effect</h2>
                Swipe to see the next slide.<br />
                </div>
                <div style={styles.slide}>
                    <Card>
                        <CardHeader
                            title="Injuries"
                        />

                        <CardText>
                            Is anyone injured?
                        </CardText>

                        <CardActions>
                            <RaisedButton primary={true} label="Next"/>
                        </CardActions>
                    </Card>
                </div>
                <div style={styles.slide}>
                    slide n°3
                </div>
            </SwipeableViews>
        </div>;
        }
}