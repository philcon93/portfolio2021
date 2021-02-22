import React, { useEffect, useState, useRef } from "react";
import * as d3 from "d3";
import PropTypes from 'prop-types';
import d3Cloud from 'd3-cloud';
import chroma from "chroma-js";

const count = (words) => {
    let counts = {};

    for (let w in words) {
      counts[words[w]] = (counts[words[w]] || 0) + 1;
    }

    return counts;
};

const createCloud = ({ words, width, height }) => {
    return new Promise(resolve => {
      const counts = count(words);
  
      const fontSize = d3
        .scaleLog()
        .domain(d3.extent(Object.values(counts)))
        .range([5, 75]);
  
      const layout = d3Cloud()
        .size([width, height])
        .words(
          Object.keys(counts)
            .filter(w => counts[w] > 1)
            .map(word => ({ word }))
        )
        .padding(5)
        .fontSize(d => fontSize(counts[d.word]))
        .text(d => d.word)
        .on("end", resolve);
  
      layout.start();
    });
};

const Word = ({ style, children, ...props })  =>{
    const ref = useRef();
    const [ transform, setTransform ] = useState(props.transform);

    useEffect(() => {
        d3.select(ref.current)
        .transition()
        .duration(500)
        .attr("transform", props.transform)
        .on("end", () => setTransform(transform));
    }, [ props ])
  
      return (
        <text
          transform={transform}
          textAnchor="middle"
          style={style}
          ref={ref}>
          {children}
        </text>
      );
};

export const WordCloud = ({ forCarol, words, height, width }) => {
    const colors = chroma.brewer.dark2;
    const [cloud, setCloud] = useState(null);

    useEffect(() => {
        createCloud({ words, width, height })
            .then(setCloud);
    }, [forCarol, width, height]);

    return (
        cloud &&
        <g transform={`translate(${width / 2}, ${height / 2})`}>
            {
                cloud.map((w, index) => (
                    <Word
                        transform={`translate(${w.x}, ${w.y}) rotate(${w.rotate})`}
                        style={{
                            fontSize: w.size,
                            fill: colors[index % colors.length]
                        }}
                        key={w.word}>
                    {w.word}
                  </Word>
                ))
            }
        </g>
    );
};

Word.propTypes = {
    children: PropTypes.string,
    style: PropTypes.object,
    transform: PropTypes.string
};

WordCloud.propTypes = {
    forCarol: PropTypes.string,
    words: PropTypes.array,
    height: PropTypes.number,
    width: PropTypes.number
};