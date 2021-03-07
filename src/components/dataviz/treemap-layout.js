import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import PropTypes from 'prop-types';

export const TreeMapLayout = ({ dataset, height, width }) => {
    const [ data, setData ] = useState(null);
    const treemap = data => {
        const root = d3.hierarchy(data)
            .sum(d => d.value);

        return d3
            .treemap()
            .size([400, 200])
            .paddingOuter(16)(root);
    };

    useEffect(() => {
        d3.json(dataset, (data) => ({
            ...data
        })).then(data => setData(treemap(data)));
    }, []);

    return (
        data ? (
        <svg width={width} height={height}>
            <g>
            {
                data.descendants().map((d, index) => {
                    return <g
                        key={index}
                        transform={`translate(${d.x0}, ${d.y0})`}>
                            <>
                            <rect
                                width={d.x1 - d.x0}
                                height={d.y1 - d.y0}
                                style={{ fill: 'cadetblue', opacity: 0.3, stroke: 'white' }} />
                            <text
                                dx={4}
                                dy={14}
                                style={{ fill: 'white', fontSize: '10px' }}>
                                    {d.data.name}
                            </text>
                            </>
                        </g>
                })
            }
            </g>
        </svg>
        ) : null
    )
}

TreeMapLayout.propTypes = {
    dataset: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number
};