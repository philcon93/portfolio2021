import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import PropTypes from 'prop-types';

const CanvasMap = ({ dataset, height, width }) => {
    const [ data, setData ] = useState(null);
    const [ geoPoint, setGeoPoint ] = useState(0);
    const ref = useRef(null);
    const projection = d3
        .geoOrthographic()
        .rotate([25, -35])
        .fitSize([width, height - 50], data)
    const geoGenerator = d3
        .geoPath()
        .projection(projection)
        .context(ref.current?.getContext('2d'));

    const londonLonLat = [0.1278, 51.5074];
    const newYorkLonLat = [-74.0059, 40.7128];
    const geoInterpolator = d3.geoInterpolate(londonLonLat, newYorkLonLat);

    useEffect(() => {
        if (data === null) {
            return;
        }

        const context = ref.current.getContext('2d');

        context.clearRect(0, 0, width, height);
        context.lineWidth = 0.5;
        context.strokeStyle = '#333';
        
        context.beginPath();
        geoGenerator({type: 'FeatureCollection', features: data.features})
        context.stroke();
        
        // Graticule
        const graticule = d3.geoGraticule();
        context.beginPath();
        context.strokeStyle = '#ccc';
        geoGenerator(graticule());
        context.stroke();
        
        // London - New York
        context.beginPath();
        context.strokeStyle = 'red';
        geoGenerator({type: 'Feature', geometry: {
            type: 'LineString', coordinates: [londonLonLat, newYorkLonLat]
        }});
        context.stroke();
        
        // Circles
        const circle01 = d3.geoCircle().center(londonLonLat).radius(5)
        context.beginPath();
        context.strokeStyle = 'red';
        geoGenerator(circle01());
        context.stroke();

        const circle02 = d3.geoCircle().center(newYorkLonLat).radius(5)
        context.beginPath();
        context.strokeStyle = 'red';
        geoGenerator(circle02());
        context.stroke();

        // Point
        context.beginPath();
        context.fillStyle = 'red';
        geoGenerator({type: 'Feature', geometry: {
            type: 'Point', coordinates: geoInterpolator(geoPoint)
        }});
        context.fill();
    }, [ geoPoint ]);

    useEffect(() => {
        d3.json(dataset, (data) => ({
            ...data
        })).then(data => setData(data));
    }, []);

    useEffect(() => {
        let interval;
        if(data) {
            interval = setInterval(() => {
                setGeoPoint(prevState => {
                    if (prevState > 1) {
                        return 0;
                    } else {
                        return Number((prevState + 0.01).toFixed(2));
                    }
                })
            }, 50);
        }

        return () => clearInterval(interval);
    }, [ data ]);

    return <canvas width={width} height={height} ref={ref} />;
}

export default CanvasMap;

CanvasMap.propTypes = {
    dataset: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number
};