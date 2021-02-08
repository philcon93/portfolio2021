import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import { Barchart } from "./tree-barchart";
import PropTypes from 'prop-types';

export const XmasTrees = ({ dataset, height, width }) => {
  const [ data, setData ] = useState(null);
  const [ value, setValue ] = useState("fake_trees");

  useEffect(() => {
    d3.tsv(dataset, ({ year, real_trees, fake_trees }) => ({
      year: Number(year),
      real_trees: Number(real_trees),
      fake_trees: Number(fake_trees)
    })).then(data => setData(data));
  }, []);

  const switchView = () => {
    setValue(prevState => {
      return prevState === "fake_trees" ? "real_trees" : "fake_trees"
    })
  };

  return (
    data ? (
      <svg
        className="cursor-pointer"
        width={width}
        height={height}
        onClick={switchView}>
        <text x={0} y={50}>
          USA buys {d3.mean(data, d => d[value]).toFixed(1)}mil{" "}
          {value === "fake_trees" ? "fake trees" : "real trees"} per year on
          average
        </text>
        <Barchart data={data} value={value} width={width} y={0} />
      </svg>
    ) : null
  )
}

XmasTrees.propTypes = {
  dataset: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string
};