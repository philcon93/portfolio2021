import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import PropTypes from 'prop-types';
import { LineChart } from './line-chart';

export const MoneyLineChart = ({ dataset, height, width }) => {
  const [ data, setData ] = useState(null);

  useEffect(() => {
    d3.tsv(dataset, ({ year, avg_spend }) => ({
      year: Number(year),
      avg_spend: Number(avg_spend)
    })).then(data => setData(data));
  }, []);

  return (
    data ? (
      <svg width={width} height={height}>
        <LineChart
            data={data}
            x={0}
            y={0}
            width={width/1.25}
            height={height/3} />
      </svg>
    ) : null
  )
}

MoneyLineChart.propTypes = {
    dataset: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number
};