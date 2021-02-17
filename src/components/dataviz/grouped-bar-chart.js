import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import PropTypes from 'prop-types';

const VerticalBarchart = ({ data, width, height }) => {
    console.log(data);
    return (
      <g/>
    );
  };

export const GroupedBarChart = ({dataset, width, height}) => {
    const [ data, setData ] = useState(null);

    useEffect(() => {
      d3.tsv(dataset, ({ category, young, mid, old}) => {

        return {
            movie: category,
            young: Number(young),
            mid: Number(mid),
            old: Number(old)
        }
      }).then(data => setData(data));
    }, []);

    return (
        <svg width={width} height={height}>
        {data && (
          <VerticalBarchart
            data={data}
            width={width - 200}
            height={height}
          />
        )}
      </svg>
    );
};


VerticalBarchart.propTypes = {
    data: PropTypes.array,
    width: PropTypes.number,
    height: PropTypes.number
};

GroupedBarChart.propTypes = {
    dataset: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number
};