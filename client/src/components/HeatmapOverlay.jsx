import React from 'react';
import DeckGL, {HexagonLayer} from 'deck.gl';

const HeatmapOverlay = ({data, viewport}) => {

    /**
     * Data format:
     * [
     *   {position: [-122.4, 37.7]},
     *   ...
     * ]
     */
    data = [ {position: [-122.4, 37.7]} ];
    const layer = new HexagonLayer({
        id: 'hexagon-layer',
        data: data,
        radius: 1000
    });


    return (<DeckGL {...viewport} layers={[layer]} />);
};

export default HeatmapOverlay;
