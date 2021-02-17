import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import chroma from "chroma-js";
import PropTypes from 'prop-types';
import { useD3 } from "d3blackbox";

const VerticalAxis = ({scale, x, y}) => {
  const refAnchor = useD3(anchor => {
    const axis = d3.axisLeft().scale(scale);

    d3.select(anchor).call(axis);
  });

  return <g ref={refAnchor} transform={`translate(${x}, ${y})`} />;
};

const BarChart = ({ entries, yScale, width, marginLeft, color }) => {
  return (
    <>
    { entries.map(([min, max], index) => (
      <rect
        x={marginLeft + width(min)}
        width={width(max) - width(min)}
        y={yScale(yScale.domain()[index])}
        height={yScale.bandwidth()}
        key={yScale.domain()[index]}
        fill={color}>
        <title>{min}, {max}</title>
      </rect>
  ))}
    </>
  )
}

const StackChart = ({ data, height }) => {
    const yScale = d3
      .scaleBand()
      .domain(data.map(d => d.category))
      .range([0, height]);
    
    const x = 75;

    const stack = d3
      .stack()
      .keys(['young', 'mid', 'old']);

    const stackData = stack(data);

    const width = d3
      .scaleLinear()
      .domain([0, d3.max(stackData[2], d => d[1])])
      .range([0, 400]);

    return (
      <>
      <VerticalAxis scale={yScale} x={x} y={0} />
      {
        stackData.map((entries, index) => (
          <BarChart
            entries={entries}
            yScale={yScale}
            key={index}
            marginLeft={x+2}
            // color={color[index]}
            width={width}
          />
        ))
      }
      </>
    );
  };

export const StackedChart = ({dataset, width, height}) => {
    const [ data, setData ] = useState(null);

    useEffect(() => {
      d3.tsv(dataset, ({ category, young, mid, old}) => {

        return {
            category: category,
            young: Number(young),
            mid: Number(mid),
            old: Number(old)
        }
      }).then(data => setData(data));
    }, []);

    return (
        <svg width={width} height={height}>
        {data && (
          <StackChart data={data} height={height} />
        )}
      </svg>
    );
};

VerticalAxis.propTypes = {
  scale: PropTypes.func,
  x: PropTypes.number,
  y: PropTypes.number
};

StackChart.propTypes = {
    data: PropTypes.array,
    width: PropTypes.number,
    height: PropTypes.number
};

StackedChart.propTypes = {
    dataset: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number
};