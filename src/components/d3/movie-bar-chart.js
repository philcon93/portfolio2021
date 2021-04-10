import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import PropTypes from 'prop-types';

const VerticalBarchart = ({ data, width, height, value }) => {
    data = data.sort((a, b) => value(b) - value(a));

    const yScale = d3
      .scaleBand()
      .paddingInner(0.1)
      .domain(data.map(d => d.movie))
      .range([0, height]);

    const widthScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, value)])
      .range([0, width]);

  
    return (
      <>
        {data.map(d => {
            const title = `${d.movie} (${d.year}) - ${value(d).toFixed(2)}mill`;
            return (
            <g key={d.movie}>
                <rect
                    x={0}
                    y={yScale(d.movie)}
                    height={yScale.bandwidth()}
                    width={widthScale(value(d))}
                    style={{
                        fill: 'green',
                        transition: 'width 500ms, y 0.8s'
                        }} />
                <title>{title}</title>
                <text
                    x={10}
                    y={yScale(d.movie) + yScale.bandwidth() / 2}
                    style={{
                        fill: 'white',
                        fontSize: '11px'
                    }}>
                {title}
                </text>
            </g>
            )
        })}
      </>
    );
  };

export const MovieBarChart = ({dataset, width, height}) => {
    const [ data, setData ] = useState(null);
    const [perYear, setPerYear] = useState(false);
    const valueFunction = perYear ? d => d.per_year : d => d.box_office;

    useEffect(() => {
      d3.tsv(dataset, ({ movie, box_office }) => {
        const year = Number(movie.match(/\((\d+)\)/)[1]);

        return {
            movie: movie.replace(/\(\d+\)/, ""),
            year: year,
            per_year: Number(box_office) / (new Date().getFullYear() - year),
            box_office: Number(box_office)
        }
      }).then(data => setData(data));
    }, []);

    return (
        <>
        <button
            onClick={() => setPerYear(!perYear)}
            className="w-1/2 flex items-center justify-center rounded-md border border-gray-300 my-3">
            {perYear ? "Show Total Box Office" : "Show Box Office Per Year"}
        </button>
        <svg width={width} height={height}>
        {data && (
          <VerticalBarchart
            data={data}
            width={width - 200}
            height={height}
            value={valueFunction}
          />
        )}
      </svg>
      </>
    );
};


VerticalBarchart.propTypes = {
    data: PropTypes.array,
    width: PropTypes.number,
    height: PropTypes.number,
    value: PropTypes.func
};

MovieBarChart.propTypes = {
    dataset: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number
};