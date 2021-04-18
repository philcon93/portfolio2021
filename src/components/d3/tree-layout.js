import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import PropTypes from 'prop-types';

const TreeLayout = ({ dataset, height, width }) => {
    const [ data, setData ] = useState(null);
    const tree = data => {
        const root = d3.hierarchy(data);

        return d3
            .tree()
            .size([400, 200])(root);
    };

    useEffect(() => {
        d3.json(dataset, (data) => ({
            ...data
        })).then(data => setData(tree(data)));
    }, []);

    return (
        data ? (
        <svg width={width} height={height}>
            <g transform={`translate(5, 5)`}>
                <g>
                {
                    data.links().map((d, index) => {
                        return <line
                            key={index}
                            x1={d.source.x}
                            y1={d.source.y}
                            x2={d.target.x}
                            y2={d.target.y}
                            style={{ fill: 'none', stroke: '#ccc', strokeWidth: '1px' }}
                        />
                    })
                }
                </g>
                <g>
                {
                    data.descendants().map((d, index) => {
                        return <circle
                            key={index}
                            cx={d.x}
                            cy={d.y}
                            r={4}
                            style={{ fill: 'steelblue', stroke: 'none' }}
                        />
                    })
                }
                </g>
            </g>
        </svg>
        ) : null
    )
}

export default TreeLayout;

TreeLayout.propTypes = {
    dataset: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number
};