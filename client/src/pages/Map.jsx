import React, { Component } from 'react';
import MapGL from 'react-map-gl';
import DeckGL, { LineLayer } from 'deck.gl';
import FlatButtonExampleIcon from '../components/Controls';

const data = [
    { sourcePosition: [153.013982, -27.496976], targetPosition: [153.055129, -27.499200] }
];

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
            }
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

        viewport.height = window.innerHeight;
        viewport.width = window.innerWidth;

        this.setState({ viewport: viewport });
    }

    render() {
        return (
            <div>
                <MapGL 
                    {...this.state.viewport} 
                    mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_KEY}
                    mapStyle="mapbox://styles/mapbox/dark-v9"
                    onViewportChange={this.viewportChange}
                >
                <DeckGL {...this.state.viewport} layers={[
                    new LineLayer({id: 'line-layer', data})
                ]} />
                </MapGL>
            </div>
        );
    }
}

export default Map;
