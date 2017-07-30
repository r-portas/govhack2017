import React, {Component} from 'react';
import MapGL from 'react-map-gl';
import DeckGLOverlay from './../deckgl-overlay.js';
import Footer from './../components/Footer';
import {csv as requestCsv} from 'd3-request';
import * as $ from 'jquery';

// const DATA_URL = 'https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/3d-heatmap/heatmap-data.csv';  // eslint-disable-line
const DATA_URL = 'https://raw.githubusercontent.com/r-portas/govhack2017/master/crash_locations.csv';  // eslint-disable-line

// Set your mapbox token here
const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_KEY;

class Map extends Component {

    constructor(props) {
        super(props);
        this.state = {
            viewport: {
                ...DeckGLOverlay.defaultViewport,
                width: 500,
                height: 500
            },
            data: null
        };

        requestCsv(DATA_URL, (error, response) => {
            if (!error) {
                let data = response.map(d => ([Number(d.Longitude), Number(d.Latitude)]));
                this.setState({data});
            }
        });
    }

    componentDidMount() {
        window.addEventListener('resize', this._resize.bind(this));
        this._resize();

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setTimeout(() => {
                    const newView = {
                        longitude: position.coords.longitude,
                        latitude: position.coords.latitude,
                        zoom: 15,
                        pitch: 58,
                        bearing: 14
                    };

                    this.setState({
                        viewport: {
                            ...this.state.viewport,
                            ...newView
                        }
                    });
                    this._resize();
                }, 1500);
            }, () => {
                console.log(`Browser supports GeoLocation.`);
                
            });
        } else {
            // TODO
            // Browser doesn't support Geolocation
            console.log(`Browser doesn't support GeoLocation.`);
        }
    }

    _resize() {
        this._onViewportChange({
            width: window.innerWidth,
            height: window.innerHeight - $('#app-header').height()
        });
    }

    _onViewportChange(viewport) {
        this.setState({
            viewport: {...this.state.viewport, ...viewport}
        });
    }

    render() {
        const {viewport, data} = this.state;
   
        return (
            <div>
                <MapGL
                    {...viewport}
                    mapStyle="mapbox://styles/mapbox/dark-v9"
                    onViewportChange={this._onViewportChange.bind(this)}
                    mapboxApiAccessToken={MAPBOX_TOKEN}>
                    <DeckGLOverlay
                        viewport={viewport}
                        data={data || []}
                    />
                </MapGL>

                <Footer />
            </div>
        );
    }
}

export default Map;
