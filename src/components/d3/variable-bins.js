import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import PropTypes from 'prop-types';
import { useD3 } from "d3blackbox";

const LeftAxis = ({ scale, x, y }) => {
    const refAnchor = useD3(anchor => {
        const axis = d3.axisLeft().scale(scale);

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

const Histogram = ({ data, yScale, xScale, height }) => {
    return data.map((d, i) =>
        <rect
            key={i}
            x={1}
            height={height - yScale(d.length)}
            width={(xScale(d.x1) - xScale(d.x0) -1)}
            transform={`translate(${xScale(d.x0)}, ${yScale(d.length)})`}
            style={{ fill: '#69b3a2',  }} />
    )
};

const VariableBins = ({ dataset, height, width }) => {
    const [ range, setRange ] = useState(30);
    const yMargin = 40;
    const [ data, setData ] = useState(null);
    const [ bins, setBins ] = useState([]);
    const [ yScale, SetYScale ] = useState();
    const xScale = d3.scaleLinear()
        .domain([0, 1000])
        .range([ 0, width ]);

    useEffect(() => {
        if (data) {
            const histogram = d3.bin()
                .domain(xScale.domain())
                .thresholds(xScale.ticks(range))
                .value(d => d.price);

            setBins(histogram(data))
            SetYScale(() => {
                return d3.scaleLinear()
                    .domain([0, d3.max(histogram(data), (d) => d.length)])
                    .range([height - yMargin, 0])
            });
        }
    }, [ data, range ]);

    useEffect(() => {
        d3.csv(dataset, (data) => ({
            ...data
        })).then(data => setData(data));
    }, []);

  return (
    bins.length > 0 && data ? (
        <>
        <svg width={width} height={height}>
            <g transform={`translate(40, 10)`}>
                <Histogram data={bins} yScale={yScale} xScale={xScale} height={height - yMargin} />
                <BottomAxis scale={xScale} x={0} y={height - yMargin} />
                <LeftAxis scale={yScale} x={0} y={0} />
            </g>
        </svg>
        <input
            type="range"
            min="1"
            max="100"
            value={range}
            onChange={e => setRange(e.target.value)} />
        </>
    ) : null
  )
}

export default VariableBins;

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

Histogram.propTypes = {
    data: PropTypes.array,
    yScale: PropTypes.func,
    xScale: PropTypes.func,
    height: PropTypes.number
};

VariableBins.propTypes = {
  dataset: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number
};