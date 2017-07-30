import React from 'react';
import DeckGL, {HexagonLayer, GridLayer} from 'deck.gl';

const HeatmapOverlay = ({data, viewport}) => {

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

    const elevationScale = {min: 10, max: 50};
    /**
     * Data format:
     * [
     *   {position: [-122.4, 37.7]},
     *   ...
     * ]
     */
    // const layer = new HexagonLayer({
    //     id: 'hexagon-layer',
    //     colorRange,
    //     data,
    //     radius: 1000,
    //     lightSettings: LIGHT_SETTINGS,
    //     elevationScale: elevationScale.max,
    // });

    /**
     * Data format:
     * [
     *   {position: [-122.4, 37.7]},
     *   ...
     * ]
     */
    data = [
        {position: [-122.4, 37.7]}
    ]
    const layer = new GridLayer({
        id: 'grid-layer',
        data,
        cellSize: 500
    });


    return (<DeckGL {...viewport} layers={[layer]} />);
};

export default HeatmapOverlay;
