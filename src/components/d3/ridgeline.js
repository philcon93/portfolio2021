import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import PropTypes from 'prop-types';
import { useD3 } from "d3blackbox";

const LeftAxis = ({ scale, x, y }) => {
    const refAnchor = useD3(anchor => {
        const axis = d3.axisLeft().scale(scale).tickSize(0);

        d3.select(anchor).call(axis);
    });

    return <g ref={refAnchor} transform={`translate(${x}, ${y})`} />;
};

const BottomAxis = ({ scale, tickValues, x, y }) => {
    const refAnchor = useD3(anchor => {
        const axis = d3.axisBottom().scale(scale).tickValues(tickValues);

        d3.select(anchor).call(axis);
    });

    return <g ref={refAnchor} transform={`translate(${x}, ${y})`} />;
};

const Ridgeline = ({ data, keys, colorScale, xScale, yScale, yNameScale, y }) => {
    const [ density, setDensity ] = useState([]);
    const [ means, setMeans ] = useState([]);

    // This is what I need to compute kernel density estimation
    const kernelDensityEstimator = (kernel, X) => {
        return (V) => {
            return X.map((x) => {
                return [x, d3.mean(V, (v) => { return kernel(x - v); })];
            });
        };
    }
    const kernelEpanechnikov = (k) => {
        return (v) => Math.abs(v /= k) <= 1 ? 0.75 * (1 - v * v) / k : 0;
    }

    useEffect(() => {
        const kde = kernelDensityEstimator(kernelEpanechnikov(7), xScale.ticks(30))
        const allDensity = []
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            const density = kde( data.map((d) => { return d[key]; }) );
            allDensity.push({key: key, density: density});
        }

        const allMeans = []
        for (const i in keys){
            const currentGroup = keys[i];
            const mean = d3.mean(data, (d) => { return +d[currentGroup] })
            allMeans.push(mean);
          }

        setDensity(allDensity);
        setMeans(allMeans);
    }, [ data ]);

    return (
        density.length > 0 ? (
            density.map((d, i) => {
                const index = keys.indexOf(d.key);
                const colour = means[index];
                const line = d3.line()
                    .x(d => xScale(d[0]))
                    .y(d => yScale(d[1]))
                    .curve(d3.curveBasis);

                return <path
                    key={i}
                    transform={`translate(0, ${yNameScale(d.key)-y})`}
                    d={line(d.density)}
                    style={{ fill: colorScale(colour), opacity: 0.7, stroke: "#000", strokeWidth: 0.1 }}
                    />
            })
        ) : null
    );
};

export const Ridgelines = ({ dataset, height, width }) => {
    const yMargin = 200;
    const xMargin = 100;
    const keys = ["Almost Certainly", "Very Good Chance", "We Believe", "Likely", "About Even", "Little Chance", "Chances Are Slight", "Almost No Chance" ]
    const [ data, setData ] = useState(null);
    const xScale = d3.scaleLinear()
        .domain([-10, 120])
        .range([ 0, width - xMargin ]);
    const yScale = d3.scaleLinear()
        .domain([0, 0.25])
        .range([ height - yMargin, 0 ]);
    const yNameScale = d3.scaleBand()
        .domain(keys)
        .range([0, height - yMargin])
        .paddingInner(1);
    const colorScale = d3.scaleSequential()
        .domain([0, 100])
        .interpolator(d3.interpolateViridis);

    useEffect(() => {
        d3.csv(dataset, (data) => ({
            ...data
        })).then(data => setData(data));
    }, []);

  return (
    data ? (
        <>
        <svg width={width} height={height}>
                <g transform={`translate(100, 150)`}>
                    <Ridgeline
                        data={data}
                        keys={keys}
                        yScale={yScale}
                        yNameScale={yNameScale}
                        xScale={xScale}
                        colorScale={colorScale}
                        y={height - yMargin} />
                    <LeftAxis scale={yNameScale} x={0} y={0} />
                    <BottomAxis scale={xScale} tickValues={[0,25, 50, 75, 100]} x={0} y={height - yMargin} />
                </g>
        </svg>
        </>
    ) : null
  )
}

LeftAxis.propTypes = {
    scale: PropTypes.func,
    x: PropTypes.number,
    y: PropTypes.number
};

BottomAxis.propTypes = {
    scale: PropTypes.func,
    tickValues: PropTypes.array,
    x: PropTypes.number,
    y: PropTypes.number
};

Ridgeline.propTypes = {
    data: PropTypes.array,
    keys: PropTypes.array,
    yScale: PropTypes.func,
    yNameScale: PropTypes.func,
    xScale: PropTypes.func,
    colorScale: PropTypes.func,
    y: PropTypes.number
};

Ridgelines.propTypes = {
  dataset: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number
};