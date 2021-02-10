import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import PropTypes from 'prop-types';

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
        
      </svg>
    ) : null
  )
}

MoneyLineChart.propTypes = {
  dataset: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string
};