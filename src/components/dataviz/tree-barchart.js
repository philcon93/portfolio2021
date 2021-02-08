import React, { Fragment } from "react";
import * as d3 from "d3";
import PropTypes from 'prop-types';

const TreeBar = ({ x, y, count }) => (
  <g transform={`translate(${x}, ${y})`}>
    <text
      x={0}
      y={-(count + 1) * 12 - 5}
      style={{ fontSize: "10px" }}>
      {count}
    </text>
    {d3.range(count).map((value, index) => (
      <text
        key={index}
        x={0}
        y={-value * 12}
        style={{ fontSize: "20px" }}>
        🎄
      </text>
    ))}
  </g>
);

export const Barchart = ({ data, value, width, y}) => {
  const xScale = d3
    .scaleBand()
    .domain(data.map(d => d.year))
    .range([0, width]);
  const yScale = 500;

  return (
    <g transform={`translate(0, ${y})`}>
      {data.map((d, index) => (
        <Fragment key={index}>
          <TreeBar
            x={xScale(d.year)}
            y={yScale - 20 }
            count={d[value]} />
          <text
            x={xScale(d.year)}
            y={yScale}
            style={{ strike: "black", fontSize: "12px" }}
            textAnchor="center">
            {d.year}
          </text>
        </Fragment>
      ))}
    </g>
  );
}

TreeBar.propTypes = {
  count: PropTypes.number,
  x: PropTypes.string,
  y: PropTypes.string
};

Barchart.propTypes = {
  data: PropTypes.array,
  value: PropTypes.string,
  width: PropTypes.number,
  y: PropTypes.string
};