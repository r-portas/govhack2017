import React, {Component} from 'react';
import DeckGL, {HexagonLayer} from 'deck.gl';
import PropTypes from 'prop-types';

const LIGHT_SETTINGS = {
  lightsPosition: [-0.144528, 49.739968, 8000, -3.807751, 54.104682, 8000],
  ambientRatio: 0.4,
  diffuseRatio: 0.6,
  specularRatio: 0.2,
  lightsStrength: [0.8, 0.0, 0.8, 0.0],
  numberOfLights: 2
};

const colorRange = [
  [1, 152, 189],
  [73, 227, 206],
  [216, 254, 181],
  [254, 237, 177],
  [254, 173, 84],
  [209, 55, 78]
];

const elevationScale = {min: 1, max: 50};

class HeatmapOverlay extends Component {
    constructor(props) {
        super(props);

        this.state = {
            elevationScale: elevationScale.min
        }
    }

    componentDidMount() {
        this._animate();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data.length !== this.props.data.length) {
            this._animate();
        }
    }

    _animate() {
        this._stopAnimate();

        // wait 1.5 secs to start animation so that all data are loaded
        this.startAnimationTimer = window.setTimeout(this._startAnimate, 1500);
    }

    _startAnimate() {
        this.intervalTimer = window.setInterval(this._animateHeight, 20);
    }

    _stopAnimate() {
        window.clearTimeout(this.startAnimationTimer);
        window.clearTimeout(this.intervalTimer);
    }

    _animateHeight() {
        if (this.state.elevationScale === elevationScale.max) {
            this._stopAnimate();
        } else {
            this.setState({elevationScale: this.state.elevationScale + 1});
        }
    }

    componentWillUnmount() {
        this._stopAnimate();
    }

    _initialize(gl) {
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);
    }

    render() {
        const data = this.props.data;
        const radius = 1000;
        const upperPercentile = 100;
        const coverage = 1;

        const layers = [
            new HexagonLayer({
                id: 'heatmap',
                colorRange,
                coverage,
                data,
                elevationRange: [0, 3000],
                elevationScale: this.state.elevationScale,
                extruded: true,
                getPosition: d => d,
                lightSettings: LIGHT_SETTINGS,
                opacity: 1,
                radius,
                upperPercentile
          })
        ];

        // return <DeckGL {...this.props.viewport} layers={layers} onWebGLInitialized={this._initialize} />
        return <DeckGL {...this.props.viewport} layers={layers} />
    }
}

HeatmapOverlay.propTypes = {
    viewport: PropTypes.object
};

export default HeatmapOverlay;
