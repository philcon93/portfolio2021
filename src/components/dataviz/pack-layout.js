import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import PropTypes from 'prop-types';

export const PackLayout = ({ dataset, height, width }) => {
    const [ data, setData ] = useState(null);
    const treemap = data => {
        const root = d3.hierarchy(data)
            .sum(d => d.value);

        return d3
            .pack()
            .size([300, 300])(root);
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
                        transform={`translate(${d.x}, ${d.y})`}>
                            <>
                            <circle
                                r={d.r}
                                style={{ fill: 'indianred', opacity: 0.3, stroke: 'white' }} />
                            <text
                                dy={4}
                                style={{ fill: 'white', fontSize: '10px', textAnchor: 'middle' }}>
                                    {d.children === undefined ? d.data.name : ''}
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

PackLayout.propTypes = {
    dataset: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number
};