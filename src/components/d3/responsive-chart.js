import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { useD3 } from "d3blackbox";
import chroma from "chroma-js";
import d3legend from "d3-svg-legend";
import PropTypes from 'prop-types';

const Legend = function({ x, y, colorScale }) {
  const ref = useD3(anchor => {
    d3.select(anchor).call(d3legend.legendColor().scale(colorScale));
  });

  return <g transform={`translate(${x}, ${y})`} ref={ref} />;
};

const BottomAxis = ({ scale, x, y }) => {
    const tickWidth = 60;
    const width = scale.range()[1];
    const tickN = Math.floor(width / tickWidth);
    const keepEveryNth = Math.floor(scale.domain().length / tickN);
    const timeFormat = d3.timeFormat("%b %Y");
    scale = scale.domain(scale.domain().filter((_, i) => i % keepEveryNth === 0));
    const axis = d3
      .axisBottom()
      .scale(scale)
      .tickFormat(timeFormat);

    const ref = useD3(anchor => {
        d3.select(anchor).call(axis);
    });

    return <g ref={ref} transform={`translate(${x}, ${y})`} />;
};

const Bars = ({ data, xScale, yScale, color, y }) => {
  return (
    data.map(([min, max], i) => {
      return !isNaN(min) && !isNaN(max) ?
        <rect
          key={i}
          x={xScale(xScale.domain()[i])}
          y={y - yScale(min) - yScale(max)}
          width={xScale.bandwidth()}
          height={yScale(max)}
          fill={color} /> : null
      })
  )
};

const ResponsiveStackChart = ({ data, keys, width, height }) => {
  const colorArray = chroma.brewer.Paired;
  const colorScale = d3
    .scaleOrdinal()
    .domain(keys)
    .range(colorArray);
  const stack = d3.stack().keys(keys)(data);
  const [ scales, setScales ] = useState({
    xScale: d3
    .scaleBand()
    .domain(data.map(d => d.date))
    .range([0, width]),
    yScale: d3
    .scaleLinear()
    .domain([0, d3.max(stack[stack.length - 1].map(d => d[1]))])
    .range([0, height - 50])
  })

  useEffect(() => {
    setScales(() => ({
        xScale: d3
          .scaleBand()
          .domain(data.map(d => d.date))
          .range([0, width]),
        yScale: d3
          .scaleLinear()
          .domain([0, d3.max(stack[stack.length - 1].map(d => d[1]))])
          .range([0, height - 50])
    }));
  }, [ width, height ]);

  return (
    <g>
      {stack.map((values, i) => {
        return <Bars
          key={`${values.key}-${i}`}
          data={values}
          xScale={scales.xScale}
          yScale={scales.yScale}
          y={height - 50}
          color={colorArray[i]} />
      })}
      <BottomAxis scale={scales.xScale} x={0} y={height - 50} />
      <Legend x={width - 100} y={height} colorScale={colorScale} />
    </g>
  );
};

const ResponsiveChart = ({ dataset, height, width }) => {
    const [ data, setData ] = useState(null);
    const [ chartWidth, setWidth ] = useState(0);
    const [ chartHeight, setHeight ] = useState(0);
    const ref = useRef();
    const parseTime = d3.timeParse("%b '%y");
    const keys = ["android", "ios", "blackberry", "microsoft"];

    useEffect(() => {
        d3.tsv(dataset, (data) => ({
            date: parseTime(data.Date),
            android: Number(data["Google Android"].replace(",", ".")),
            ios: Number(data["Apple iOS"].replace(",", ".")),
            blackberry: Number(data["RIM / Blackberry"].replace(",", ".")),
            microsoft: Number(data["Microsoft"].replace(",", "."))
        })).then(data => setData(data));
    }, []);

    const measureSVG = () => {
        const { width, height } = ref.current.getBoundingClientRect();

        setWidth(width);
        setHeight(height - 100);
    };

    useEffect(() => {
        measureSVG();
        window.addEventListener("resize", measureSVG);

        return () => window.removeEventListener("resize", measureSVG);
    }, []);

    return (
        <svg width={width} height={height} ref={ref}>
          {
            data &&
            <ResponsiveStackChart
              data={data}
              keys={keys}
              width={chartWidth}
              height={chartHeight} />
          }
        </svg>
    )
}

export default ResponsiveChart;

Legend.propTypes = {
  colorScale: PropTypes.func,
  x: PropTypes.number,
  y: PropTypes.number
};

BottomAxis.propTypes = {
  scale: PropTypes.func,
  x: PropTypes.number,
  y: PropTypes.number
};

ResponsiveStackChart.propTypes = {
  data: PropTypes.array,
  keys: PropTypes.array,
  width: PropTypes.number,
  height: PropTypes.number
};

ResponsiveChart.propTypes = {
    dataset: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.string
};