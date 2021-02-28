import React, { useEffect, useState } from "react";
import * as d3 from "d3";
  
const HybridExample = ({ r = 12, explode, x, y }) => {
    const [radius, setRadius] = useState(r);
    const angleScale = d3
      .scaleLinear()
      .domain([0, r])
      .range([0, Math.PI * 2]);
  
    useEffect(() => {
      explodeFunc();
    }, [explode]);
  
    const explodeFunc = () => {
      const elastic = d3.easeElasticOut;
      elastic.amplitude(5);
      elastic.period(-0.3);
  
      d3.selection()
        .transition(Math.random().toString())
        .ease(elastic)
        .duration(1000)
        .tween("radius", () => {
          const radiusInt = d3.interpolate(radius, radius > 10 ? 10 : 60);
          return (t) => setRadius(radiusInt(t));
        });
    };
  
    return (
      <g transform={`translate(${x}, ${y})`}>
        {d3.range(r).map((i) => (
          <rect
            key={i}
            x={Math.cos(angleScale(i)) * radius}
            y={Math.sin(angleScale(i)) * radius}
            width={10}
            height={10}
            style={{ fill: '#f22613' }} />
        ))}
      </g>
    );
};

export const CircleAnimation = ({ width, height}) => {
  const [explode, setExplode] = useState(false);

  return (
      <svg
        width={width}
        height={height}
        style={{ cursor: 'pointer' }}
        onClick={() => setExplode(!explode)}>
        <HybridExample
          explode={explode}
          width={width}
          height={height}
          x={250}
          y={250} />
        <HybridExample
          explode={explode}
          width={width}
          height={height}
          x={75}
          y={250} />
        <HybridExample
          explode={explode}
          width={width}
          height={height}
          x={425}
          y={250} />
      </svg>
  );
};

