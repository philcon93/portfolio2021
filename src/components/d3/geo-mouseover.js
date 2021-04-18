import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import PropTypes from 'prop-types';

const GeoMouseover = ({ dataset, height, width }) => {
    const [ info, setInfo ] = useState('Hover over a country');
    const [ boundingBox, setBoundingBox ] = useState({
        'x': null,
        'y': null,
        'width': null,
        'height': null
    });
    const [ centroidTranslate, setCentroidTranslate ] = useState(null)
    const [ data, setData ] = useState(null);
    const projection = d3
        .geoMercator()
        .scale(400)
        .translate([200, 280])
        .center([0, 5])
    const geoGenerator = d3
        .geoPath()
        .projection(projection);

    useEffect(() => {
        d3.json(dataset, (data) => ({
            ...data
        })).then(data => setData(data));
    }, []);

    const onMouseOver = (d) => {
        const pixelArea = geoGenerator.area(d);
        const bounds = geoGenerator.bounds(d);
        const centroid = geoGenerator.centroid(d);
        const measure = geoGenerator.measure(d);
      
        setInfo(`${d.properties.name} (path.area = ${pixelArea.toFixed(1)} path.measure = ${measure.toFixed(1)})`);
      
        setBoundingBox({
          'x': bounds[0][0],
          'y': bounds[0][1],
          'width': bounds[1][0] - bounds[0][0],
          'height': bounds[1][1] - bounds[0][1]
        });
        
        setCentroidTranslate(centroid);
    }

    return (
        data ? (
            <>
            <div>{info}</div>
            <svg width={width} height={height}>
                <g>
                {
                    data.features.map((d, index) => {
                        return <path
                            key={index}
                            d={geoGenerator(d)}
                            style={{ fill: '#ddd', stroke: '#aaa' }}
                            onMouseOver={() => onMouseOver(d)}/>
                    })
                }
                </g>
                {
                    boundingBox.x && <g>
                        <rect
                            {...boundingBox}
                            style={{ fill: 'none', stroke: '#333', strokeDasharray: '2,1' }} />
                    </g>
                }
                {
                    centroidTranslate && <g>
                        <circle
                            r="4"
                            style={{ display: 'inline', fill: 'red' }}
                            transform={`translate(${centroidTranslate})`}/>
                    </g>
                }
            </svg>
            </>
        ) : null
    )
}

export default GeoMouseover;

GeoMouseover.propTypes = {
    dataset: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number
};