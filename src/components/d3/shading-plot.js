import React, { Fragment, useEffect, useState } from "react";
import * as d3 from "d3";
import PropTypes from 'prop-types';
import { BottomAxis, LeftAxis } from "./axis";

const DensityPlot = ({ data, width, height, yScale, xScale, colorScale }) => {
    // compute the density data
    const densityData = d3.contourDensity()
        .x(d => xScale(d.x))
        .y(d => yScale(d.y))
        .size([ width, height ])
        .bandwidth(20);

    return <g> {densityData(data).map((d, i) =>
            <path
                key={i}
                d={d3.geoPath()(d)}
                style={{ fill: colorScale(d.value)}} />
        )}
    </g>
};

const Shadingplot = ({ dataset, height, width }) => {
    const yMargin = 40;
    const xMargin = 50;
    const innerWidth = width - xMargin;
    const innerHeight = height - yMargin;
    const [ data, setData ] = useState(null);
    const xScale = d3.scaleLinear()
        .domain([ 5, 20 ])
        .range([ 0, innerWidth ]);
    const yScale = d3.scaleLinear()
        .domain([ 5, 25 ])
        .range([ innerHeight, 0 ]);
    const colorScale = d3.scaleLinear()
        .domain([0, 1])
        .range(["white", "#69b3a2"]);

    useEffect(() => {
        d3.csv(dataset, (data) => ({
            ...data
        })).then(data => setData(data));
    }, []);

  return (
    data ? (
        <>
        <svg width={width} height={height}>
            <g transform={`translate(40, 10)`}>
                <DensityPlot
                    data={data}
                    width={innerWidth}
                    height={innerHeight}
                    yScale={yScale}
                    xScale={xScale}
                    colorScale={colorScale} />
                <LeftAxis scale={yScale} x={0} y={0} />
                <BottomAxis scale={xScale} x={0} y={innerHeight} />
            </g>
        </svg>
        </>
    ) : null
  )
}

export default Shadingplot;

DensityPlot.propTypes = {
    data: PropTypes.array,
    yScale: PropTypes.func,
    xScale: PropTypes.func,
    colorScale: PropTypes.func,
    width: PropTypes.number,
    height: PropTypes.number
};

Shadingplot.propTypes = {
  dataset: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number
};