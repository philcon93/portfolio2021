import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import PropTypes from 'prop-types';

export const CanvasClickMap = ({ dataset, height, width }) => {
    const [ data, setData ] = useState(null);
    const [ rotation, setRotation ] = useState(25);
    const [ location, setLocation ] = useState(null);
    const ref = useRef(null);
    const projection = d3
        .geoOrthographic()
        .rotate([rotation, 0])
        .fitSize([width, height - 50], data)
    const geoGenerator = d3
        .geoPath()
        .projection(projection)
        .context(ref.current?.getContext('2d'));

    const onClick = (e) => {
        const pos = d3.pointer(e);

        setLocation(projection.invert(pos));
    }

    useEffect(() => {
        if (data === null) {
            return;
        }

        const context = ref.current.getContext('2d');

        context.clearRect(0, 0, width, height);
        
        data.features.forEach((d) => {
            context.beginPath();
            context.fillStyle = location && d3.geoContains(d, location) ? 'red' : '#aaa';
            geoGenerator(d);
            context.fill();
        });

    }, [ location, rotation ]);

    useEffect(() => {
        d3.json(dataset, (data) => ({
            ...data
        })).then(data => setData(data));
    }, []);

    useEffect(() => {
        let interval;
        if(data) {
            interval = setInterval(() => {
                setRotation(prevState => {
                    if (prevState >= 360) {
                        return 0;
                    } else {
                        return Number(prevState + 1);
                    }
                })
            }, 60);
        }

        return () => clearInterval(interval);
    }, [ data ]);

    return <canvas width={width} height={height} ref={ref} onClick={onClick}/>;
}

CanvasClickMap.propTypes = {
    dataset: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number
};