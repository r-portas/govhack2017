import React, { Component } from 'react';
import MapGL from 'react-map-gl';
<<<<<<< HEAD
import DeckGL, { LineLayer } from 'deck.gl';
import FlatButtonExampleIcon from '../components/Controls';
=======
>>>>>>> e8c18f0ac04ff9ce8903281facdc1b7d9ee07d8c

import HeatmapOverlay from './../components/HeatmapOverlay';

class Map extends Component {

    constructor(props) {
        super(props);

        this.state = {
            viewport: {
                width: 500,
                height: 500,
                longitude: 153.021072,
                latitude: -27.470125,
                zoom: 15,
                pitch: 40,
                bearing: -27.39
            },
            data: [
                {position: [ -0.205590, 51.514910 ]}
            ]
        };

        this.resize = this.resize.bind(this);
        this.viewportChange = this.viewportChange.bind(this);
    }

    componentDidMount() {
        window.addEventListener('resize', this.resize); 
        this.resize();
    }

    viewportChange(viewport) {
        const {width, height, latitude, longitude, zoom} = viewport;

        const  vp = this.state.viewport;
        vp.latitude = latitude;
        vp.longitude = longitude;
        vp.zoom = zoom;
        vp.width = width;
        vp.height = height;
        this.setState({ viewport: vp });
    }

    resize() {
        const viewport = this.state.viewport;

        viewport.height = window.innerHeight - 64;
        viewport.width = window.innerWidth;

        this.setState({ viewport: viewport });
    }

    render() {

        const { viewport, data } = this.state;

        return (
            <div>
                <MapGL 
                    {...viewport} 
                    mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_KEY}
                    mapStyle="mapbox://styles/mapbox/dark-v9"
                    onViewportChange={this.viewportChange}
                >
<<<<<<< HEAD
                <DeckGL {...this.state.viewport} layers={[
                    new LineLayer({id: 'line-layer', data})
                ]} />
=======
                    <HeatmapOverlay
                        viewport={viewport}
                        data={data || []}
                    />
>>>>>>> e8c18f0ac04ff9ce8903281facdc1b7d9ee07d8c
                </MapGL>
            </div>
        );
    }
}

export default Map;
