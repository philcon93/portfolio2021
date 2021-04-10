import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import PropTypes from 'prop-types';

export const AUStates = ({dataset, width, height}) => {
    const [ data, setData ] = useState(null);
    const projection = d3
        .geoMercator()
        .center([ 132, -28 ])
        .translate([ width/2, height/2 ])
        .scale(700);
    const geoGenerator = d3
        .geoPath()
        .projection(projection);
    const colorScale = d3
        .scaleOrdinal()
        .range(['#8dd3c7','#ffffb3','#bebada','#fb8072','#80b1d3','#fdb462','#b3de69','#fccde5','#d9d9d9']);

    useEffect(() => {
        d3.json(dataset, (data) => ({
            ...data
        })).then(data => setData(data));
    }, []);

    return (
        <svg width={width} height={height}>
        {data && (
            <g>
            {
                data.features.map((d, index) => {
                    return (
                        <g key={index}>
                            <path
                            d={geoGenerator(d)}
                            style={{ fill:  colorScale(index), stroke: 'dimgray' }} />
                            <text
                                dy=".35em"
                                transform={`translate(${geoGenerator.centroid(d)})`}
                                style={{
                                    fill: "darkslategray",
                                    textAnchor: "middle",
                                    fontSize: '10px'
                                }}>
                                {d.properties.STATE_NAME}
                            </text>
                        </g>
                    );
                })
            }
            <text
                x={width / 1.85}
                y={height / 2}
                style={{
                    fontSize: 70,
                    fontWeight: "bold",
                    textAnchor: "middle",
                    opacity: "0.1"
                }}>AUSTRALIA
            </text>
            </g>
        )}
        </svg>
    );
};

AUStates.propTypes = {
    dataset: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number
};