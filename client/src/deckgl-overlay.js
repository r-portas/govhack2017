/* global window */
import React, {Component} from 'react';
import DeckGL, {HexagonLayer} from 'deck.gl';

const LIGHT_SETTINGS = {
    lightsPosition: [153.02, -27.47, 8000],
    ambientRatio: 0.4,
    diffuseRatio: 0.6,
    specularRatio: 0.2,
    lightsStrength: [0.8, 0.0, 0.8, 0.0],
    numberOfLights: 2
};

const colorRange = [
    [1, 152, 189, 50],
    [73, 227, 206, 50],
    [216, 254, 181, 50],
    [254, 237, 177, 50],
    [254, 173, 84, 50],
    [209, 55, 78, 50]
];

const elevationScale = {min: 1, max: 2};

const defaultProps = {
    radius: 20,
    upperPercentile: 100,
    coverage: 0.75
};

export default class DeckGLOverlay extends Component {
    constructor(props) {
        super(props);

        this.startAnimationTimer = null;
        this.intervalTimer = null;
        this.state = {
            elevationScale: elevationScale.min
        };

        this._startAnimate = this._startAnimate.bind(this);
        this._animateHeight = this._animateHeight.bind(this);

    }


    static get defaultColorRange() {
      return colorRange;
    }

    static get defaultViewport() {
        return {
            longitude: 153.057457,
            latitude: -27.587300,
            zoom: 12,
            minZoom: 2,
            maxZoom: 20,
            pitch: 40.5,
            bearing: -27.396674584323023
        };
    }
  
    componentDidMount() {
        this._animate();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data.length !== this.props.data.length) {
            this._animate();
        }
    }

    componentWillUnmount() {
        this._stopAnimate();
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

    _initialize(gl) {
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);
    }

    render() {
        const {viewport, data, radius, coverage, upperPercentile} = this.props;

        if (!data) {
            return null;
        }

        const layers = [
            new HexagonLayer({
            id: 'heatmap',
            colorRange,
            coverage,
            data,
            elevationRange: [0, 1000],
            elevationScale: this.state.elevationScale,
            extruded: true,
            getPosition: d => d,
            lightSettings: LIGHT_SETTINGS,
            onHover: this.props.onHover,
            opacity: 1,
            pickable: Boolean(this.props.onHover),
            radius,
            upperPercentile
            })
        ];

        return <DeckGL {...viewport} layers={layers} onWebGLInitialized={this._initialize} />;
    }
}

DeckGLOverlay.displayName = 'DeckGLOverlay';
DeckGLOverlay.defaultProps = defaultProps;
