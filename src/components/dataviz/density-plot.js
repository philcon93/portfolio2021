import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import PropTypes from 'prop-types';
import { useD3 } from "d3blackbox";
import d3legend from "d3-svg-legend";
import chroma from "chroma-js";

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

const Legend = function({ x, y, colorScale }) {
    const ref = useD3(anchor => {
      d3.select(anchor).call(d3legend.legendColor().scale(colorScale));
    });
  
    return <g transform={`translate(${x}, ${y})`} ref={ref} />;
};

const Density = ({ data, yScale, xScale, width }) => {
    const groups = d3.group(data, d => d.type);
    const colorScale = d3
      .scaleOrdinal()
      .domain([...groups].map(group => group[0]))
      .range(chroma.brewer.Pastel1);

    const kernelDensityEstimator = (kernel, X) => {
        return (V) => {
          return X.map((x) => {
            return [x, d3.mean(V, (v) => { return kernel(x - v); })];
          });
        };
    };
    const kernelEpanechnikov = (k) => {
        return (v) => {
          return Math.abs(v /= k) <= 1 ? 0.75 * (1 - v * v) / k : 0;
        };
    };
    const kde = kernelDensityEstimator(kernelEpanechnikov(7), xScale.ticks(60))

    return (
        <g>{
            [...groups].map((data, i) => {
            const density = kde(data[1].map((d) => d.value ));
            const line = d3.line()
                .x(d => xScale(d[0]))
                .y(d => yScale(d[1]))
                .curve(d3.curveBasis);

            return <g key={i}>
                <path
                    d={line(density)}
                    style={{
                        fill: colorScale(data[0]),
                        opacity: ".6",
                        stroke: "#000",
                        strokeWidth: "1",
                        strokeLinejoin: "round"
                    }} />
            </g>
            })
        }
        <Legend x={width - 150} y={0} colorScale={colorScale} />
        </g>
    );
};

export const DensityPlot = ({ dataset, height, width }) => {
    const yMargin = 40;
    const [ data, setData ] = useState(null);
    const yScale = d3.scaleLinear()
        .range([height - yMargin, 0])
        .domain([0, 0.12]);
    const xScale = d3.scaleLinear()
        .domain([-10,15])
        .range([ 0, width ]);

    useEffect(() => {
        d3.csv(dataset, (data) => ({
            ...data
        })).then(data => setData(data));
    }, []);

  return (
    data ? (
      <svg width={width} height={height}>
            <g transform={`translate(40, 10)`}>
                <Density
                    data={data}
                    yScale={yScale}
                    xScale={xScale}
                    width={width}
                    height={height} />
                <BottomAxis scale={xScale} x={0} y={height - yMargin} />
                <LeftAxis scale={yScale} x={0} y={0} />
            </g>
      </svg>
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
    x: PropTypes.number,
    y: PropTypes.number
};

Legend.propTypes = {
    colorScale: PropTypes.func,
    x: PropTypes.number,
    y: PropTypes.number
};

Density.propTypes = {
    data: PropTypes.array,
    yScale: PropTypes.func,
    xScale: PropTypes.func,
    width: PropTypes.number
};

DensityPlot.propTypes = {
  dataset: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number
};