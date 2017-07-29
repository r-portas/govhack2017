import React, {Component} from 'react';
import MapGL from 'react-map-gl';
import DeckGLOverlay from './../deckgl-overlay.js';

import {csv as requestCsv} from 'd3-request';

// const DATA_URL = 'https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/3d-heatmap/heatmap-data.csv';  // eslint-disable-line
const DATA_URL = 

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
                let data = response.map(d => ([Number(d.lng), Number(d.lat)]));
                this.setState({data});
            }
        });

    }

    componentDidMount() {
        window.addEventListener('resize', this._resize.bind(this));
        this._resize();
    }

    _resize() {
        this._onViewportChange({
            width: window.innerWidth,
            height: window.innerHeight
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
        );
    }
}

export default Map;
