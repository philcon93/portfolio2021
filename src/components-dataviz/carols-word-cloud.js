import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import PropTypes from 'prop-types';
import { parseText } from '../utilities/parse-text';
import { WordCloud } from './word-cloud';

export const CarolsWordCloud = ({ dataset, height, width }) => {
  const catchAllGroup = "All carols";
  const [ data, setData ] = useState(null);
  const [chosenCarol, setChosenCarol] = useState(catchAllGroup);

  useEffect(() => {
    d3.text(dataset)
      .then(data => parseText(data, catchAllGroup))
      .then(data => setData(data));
  }, []);

  const getWords = () => {
    if (data === null) {
      return [];
    }
    return data[chosenCarol]
      .join()
      .toLowerCase()
      .split(/\W/)
      .filter(word => word.trim().length > 0);
  };

  return (
    data ? (
        <>
            <select onChange={(e) => setChosenCarol(e.target.value)} value={chosenCarol} className="block w-full pl-3 pr-10 py-2 border rounded shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed text-black placeholder-gray-400 bg-white border-gray-300 focus:border-blue-500">
              {Object.keys(data).map((carol, index) => (
                  <option key={index} value={carol}>{carol}</option>
              ))}
            </select>
            <svg width={width} height={height}>
              <WordCloud
                words={getWords()}
                forCarol={chosenCarol}
                width={width - 200}
                height={height - 200} />
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