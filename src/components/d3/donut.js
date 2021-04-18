import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import chroma from "chroma-js";
import { useD3 } from "d3blackbox";
import d3legend from "d3-svg-legend";
import PropTypes from 'prop-types';

const Legend = function({ x, y, colorScale }) {
    const ref = useD3(anchor => {
      d3.select(anchor).call(d3legend.legendColor().scale(colorScale));
    });
  
    return <g transform={`translate(${x}, ${y})`} ref={ref} />;
};

const Donut = ({ data, x, y, r }) => {
    const [selected, setSelected] = useState(null);
    const color = chroma.brewer.Pastel1;
    const colorScale = d3
        .scaleOrdinal()
        .domain(data.map(d => d.answer))
        .range(color);

    const pie = d3.pie().value(d => d.percentage);
    const arc = d3
        .arc()
        .innerRadius(90)
        .outerRadius(r)
        .padAngle(0.01);

    return (
        <g transform={`translate(${x}, ${y})`}>
          {
            pie(data).map((d, index) =>
              <path
                d={arc
                  .innerRadius(selected === d.index ? 85 : 90)
                  .outerRadius(selected === d.index ? r + 10 : r)
                  .padAngle(selected === d.index ? 0.05 : 0.01)(d)}
                fill={color[d.index]}
                onMouseOver={() => setSelected(d.index)}
                onMouseOut={() => setSelected(null)}
                key={index} />
            )
          }
            <Legend x={x} y={y} colorScale={colorScale} />
        </g>
    );
};

const DonutWrapper = ({ dataset, height, width }) => {
  const [ data, setData ] = useState(null);

  useEffect(() => {
    d3.tsv(dataset, ({ answer, percentage }) => ({
        answer: answer,
        percentage: Number(percentage)
    })).then(data => setData(data));
  }, []);

  return (
    data ? (
      <svg width={width} height={height}>
        <Donut data={data} x={200} y={200} r={150} />
      </svg>
    ) : null
  )
}

export default DonutWrapper;

Legend.propTypes = {
  colorScale: PropTypes.func,
  x: PropTypes.number,
  y: PropTypes.number
};

Donut.propTypes = {
  data: PropTypes.array,
  x: PropTypes.number,
  y: PropTypes.number,
  r: PropTypes.number
};

DonutWrapper.propTypes = {
    dataset: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number
};