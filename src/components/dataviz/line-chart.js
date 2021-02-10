import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import PropTypes from 'prop-types';

export const LineChart = ({ data, x, y, width, height }) => {
    const xScale = d3
        .scaleBand()
        .domain(data.map(d => d.year))
        .range([0, width]);
    const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(data, d => d.avg_spend)])
        .range([0, height])
    const line = d3
        .line()
        .x(d => xScale(d.year))
        .y(d => yScale(d.avg_spend))

    return (
        <g transform={`translate(${x},${y})`}>
            <path d={line(data)} style={{ strokeWidth: '2px', stroke: 'green', fill: 'none' }}/>
        </g>
    );
}

LineChart.propTypes = {
    data: PropTypes.array,
    x: PropTypes.number,
    y: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number
};