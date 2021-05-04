import React from "react";
import * as d3 from "d3";
import PropTypes from 'prop-types';
import { useD3 } from "d3blackbox";

export const LeftAxis = ({ scale, x, y }) => {
    const refAnchor = useD3(anchor => {
        const axis = d3.axisLeft().scale(scale);

        d3.select(anchor).call(axis);
    });

    return <g ref={refAnchor} transform={`translate(${x}, ${y})`} />;
};

export const BottomAxis = ({ scale, x, y }) => {
    const refAnchor = useD3(anchor => {
        const axis = d3.axisBottom().scale(scale);

        d3.select(anchor).call(axis);
    });

    return <g ref={refAnchor} transform={`translate(${x}, ${y})`} />;
};

LeftAxis.propTypes = {
    scale: PropTypes.func,
    x: PropTypes.number,
    y: PropTypes.number
};

BottomAxis.propTypes = {
    scale: PropTypes.func,
    x: PropTypes.number,
    y: PropTypes.number
};