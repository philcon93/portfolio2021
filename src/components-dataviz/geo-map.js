import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import PropTypes from 'prop-types';

export const GeoMap = ({ dataset, height, width }) => {
    const [ data, setData ] = useState(null);
    const projection = d3
        .geoEquirectangular()
        .scale(200)
        .translate([200, 150])
        .fitExtent([[0, 0], [width, height]], data)
    const geoGenerator = d3
        .geoPath()
        .projection(projection);

    useEffect(() => {
        d3.json(dataset, (data) => ({
            ...data
        })).then(data => setData(data));
    }, []);

    return (
        data ? (
        <svg width={width} height={height}>
            <g>
            {
                data.features.map((d, index) => {
                    return <path
                        key={index}
                        d={geoGenerator(d)}
                        style={{ fill: '#ddd', stroke: '#aaa' }} />
                })
            }
            </g>
        </svg>
        ) : null
    )
}

GeoMap.propTypes = {
    dataset: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number
};