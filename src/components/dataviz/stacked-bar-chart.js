import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import chroma from "chroma-js";
import PropTypes from 'prop-types';
import { useD3 } from "d3blackbox";
import legend from "d3-svg-legend";

const VerticalAxis = ({scale, x, y}) => {
  const refAnchor = useD3(anchor => {
    const axis = d3.axisLeft().scale(scale);

    d3.select(anchor).call(axis);
  });

  return <g ref={refAnchor} transform={`translate(${x}, ${y})`} />;
};

const BarChart = ({ entries, yScale, xScale, marginLeft, color }) => {
  return (
    <>
    { entries.map(([min, max], index) => (
      <rect
        x={marginLeft + xScale(min)}
        width={xScale(max) - xScale(min)}
        y={yScale(yScale.domain()[index])}
        height={yScale.bandwidth()}
        key={yScale.domain()[index]}
        fill={color}>
        <title>Age: {min} - {max}</title>
      </rect>
    ))}
    </>
  )
}

const Legend = ({ scale, x, y }) => {
  const refAnchor = useD3(anchor => {
    const legendA = legend
      .legendColor()
      .scale(scale)
      .title("Age group");

    d3.select(anchor).call(legendA);
  })
  return <g ref={refAnchor} transform={`translate(${x}, ${y})`} />
}

const StackChart = ({ data, width, height }) => {
    const yScale = d3
      .scaleBand()
      .domain(data.map(d => d.category))
      .range([0, height]);
    
    const x = 215;

    const stack = d3
      .stack()
      .keys(['young', 'mid', 'old']);

    const stackData = stack(data);

    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(stackData[2], d => d[1])])
      .range([0, width/1.75]);

    const color = chroma.brewer.pastel2;

    const colorScale = d3
      .scaleOrdinal()
      .domain(["🧒 18 to 29 years", "🙍‍♂️ 30 to 59 years", "🧓 60 years or older"])
      .range(color);

    return (
      <>
      <VerticalAxis scale={yScale} x={x} y={0} />
      {
        stackData.map((entries, index) => (
          <BarChart
            key={index}
            marginLeft={x+2}
            entries={entries}
            yScale={yScale}
            xScale={xScale}
            color={color[index]} />
        ))
      }
      <Legend scale={colorScale} x={width/1.75} y={height - 100} />
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
          <StackChart data={data} width={width} height={height} />
        )}
      </svg>
    );
};

VerticalAxis.propTypes = {
  scale: PropTypes.func,
  x: PropTypes.number,
  y: PropTypes.number
};

BarChart.propTypes = {
  entries: PropTypes.array,
  yScale: PropTypes.func,
  xScale: PropTypes.func,
  marginLeft: PropTypes.number,
  color: PropTypes.string
};

Legend.propTypes = {
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