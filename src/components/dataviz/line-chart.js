import React, { useState } from "react";
import * as d3 from "d3";
import { useD3 } from "d3blackbox";
import PropTypes from 'prop-types';

const LeftAxis = ({ scale, x, y }) => {
    const refAnchor = useD3(anchor => {
        const axis = d3.axisLeft().scale(scale).ticks();

        d3.select(anchor).call(axis);
    });

    return <g ref={refAnchor} transform={`translate(${x}, ${y})`} />;
};

const BottomAxis = ({ scale, x, y }) => {
    const refAnchor = useD3(anchor => {
        const axis = d3.axisBottom().scale(scale);

        d3.select(anchor).call(axis);
    });

    return <g ref={refAnchor} transform={`translate(${x}, ${y})`} />;
};

const Highlight = (props) => {
    return (
        <line
            {...props}
            className="stroke-1 stroke-current text-gray-300" />
    );
};

export const LineChart = ({ data, x, y, width, height }) => {
    const [ highlight, setHighlight ] = useState();

    const xScale = d3
        .scalePoint()
        .domain(data.map(d => d.year))
        .range([0, width]);
    const yScale = d3
        .scaleLinear()
        .domain([600, d3.max(data, d => d.avg_spend)])
        .range([height, 0])
    const line = d3
        .line()
        .x(d => xScale(d.year))
        .y(d => yScale(d.avg_spend))

    return (
        <g transform={`translate(${x},${y})`}>
            <path
                d={line(data)}
                className="stroke-2 stroke-current text-green-600"
                style={{ strokeLinejoin: 'round', fill: 'none' }}/>
            {
                data.map(d => (
                    <text
                        key={d.year}
                        x={xScale(d.year)}
                        y={yScale(d.avg_spend)}
                        onMouseOver={() => setHighlight(d.year)}
                        onMouseOut={() => setHighlight(null)}
                        className="cursor-pointer"
                        style={{textAnchor: 'middle'}}>
                        💸
                        <title>${d.avg_spend}</title>
                    </text>
                ))
            }
            {
                highlight &&
                    <Highlight
                        x1={xScale(highlight)}
                        y1={-20}
                        x2={xScale(highlight)}
                        y2={height + 20} />
            }
            <BottomAxis scale={xScale} x={0} y={height} />
            <LeftAxis scale={yScale} x={0} y={0} />
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