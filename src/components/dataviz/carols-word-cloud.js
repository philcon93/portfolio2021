import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import PropTypes from 'prop-types';
import { parseText } from '../../utilities/parse-text';

export const CarolsWordCloud = ({ dataset, height, width }) => {
  const [ data, setData ] = useState(null);
  const [chosenCarol, setChosenCarol] = useState("All carols");

  useEffect(() => {
    d3.text(dataset)
      .then(data => parseText(data, "All carols"))
      .then(data => setData(data));
  }, []);

  return (
    data ? (
        <>
            <select onChange={(e) => setChosenCarol(e.value)} value={chosenCarol}>
              {Object.keys(data).map((carol, index) => (
                  <option key={index}>{carol}</option>
              ))}
            </select>
            <svg
                width={width}
                height={height}>
            </svg>
        </>
    ) : null
  )
}

CarolsWordCloud.propTypes = {
  dataset: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number
};