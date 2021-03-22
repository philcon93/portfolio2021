import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import PropTypes from 'prop-types';

const Arc = ({ d, r, width }) => {
    const arc = d3
      .arc()
      .innerRadius(r)
      .outerRadius(r + width)
      .startAngle(0)
      .endAngle((d.percentage / 100) * (Math.PI * 2));
  
    return (
      <g>
        <text y={-r} x={-10} style={{fill: 'white', textAnchor: 'end'}}>{d.name}</text>
        <path d={arc()} style={{fill: 'white'}} />
      </g>
    );
  };
  
  const CircleArcs = ({ data, maxR }) => {
    const rScale = d3
      .scaleBand()
      .paddingInner(0.4)
      .paddingOuter(1)
      .domain(d3.range(data.length))
      .range([0, maxR]);
  
    return (
      <g>
        <circle cx={0} cy={0} r={maxR} style={{fill: '#0066cc'}}/>
        {data.map((d, i) => (
          <Arc d={d} r={rScale(i)} width={rScale.bandwidth()} key={i} />
        ))}
      </g>
    );
};

export const RoundDashboard = ({dataset, width, height}) => {
    const [ data, setData ] = useState(null);

    useEffect(() => {
        d3.json(dataset, (data) => ({
            ...data
        })).then(data => setData(data));
    }, []);

    return (
        <svg width={width} height={height}>
        {data && (
            <g transform={`translate(${width / 2}, ${height / 2})`}>
                <CircleArcs data={data} maxR={150} />
            </g>
        )}
        </svg>
    );
};

Arc.propTypes = {
    d: PropTypes.object,
    r: PropTypes.number,
    width: PropTypes.number
};

CircleArcs.propTypes = {
    data: PropTypes.array,
    maxR: PropTypes.number
};

RoundDashboard.propTypes = {
    dataset: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number
};