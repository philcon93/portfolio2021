import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import PropTypes from 'prop-types';

const Labels = ({ datum, radius }) => {
    const labelVisible = (d) => {
        return d.y1 <= 3 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03;
    };
    
    const labelTransform = (d) => {
        const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
        const y = (d.y0 + d.y1) / 2 * radius;
        return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
    }

    const gStyles = {
        pointerEvent: "none",
        textAnchor: "middle",
        userSelect: "none",
    }

    return (
        <g style={gStyles}>
            {
                datum.map((d, index) =>
                    <text
                        dy="0.35em"
                        fillOpacity={+labelVisible(d)}
                        transform={labelTransform(d)}
                        style={{cursor: 'pointer'}}
                        key={index}>
                        {d.data.name}
                    </text>
            )
            }
        </g>
    )
}

const arcTween = (oldData, newData, arc) => {
    const dataCopy = { ...oldData };

    return () => {
        const startAngle = d3.interpolate(
            oldData.x0,
            newData.x0
        );
        const endAngle = d3.interpolate(
            oldData.x1,
            newData.x1
        );
  
      return (t) => {
        dataCopy.startAngle = startAngle(t);
        dataCopy.endAngle = endAngle(t);
        return arc(dataCopy);
      };
    };
};

const Arc = ({ children, d, fill, fillOpacity, radius, ...props }) => {
    const ref = useRef();
    const arc = d3.arc()
        .startAngle(d => d.x0)
        .endAngle(d => d.x1)
        .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
        .padRadius(radius * 1.5)
        .innerRadius(d => d.y0 * radius)
        .outerRadius(d => Math.max(d.y0 * radius, d.y1 * radius - 1));
    const [ data, setData ] = useState(d);
    const [ pathData, setPathData ] = useState(arc(d));

    useEffect(() => {
        d3.select(ref.current)
        .transition()
        .duration(750)
        .attr("d", arc(d))
        .attrTween("d", arcTween(data, d, arc))
        .on("end", () => {
            setData(d);
            setPathData(arc(d));
        });
    }, [ d ]);

    return (
        <path
            ref={ref}
            d={pathData}
            fill={fill}
            fillOpacity={fillOpacity}
            style={{cursor: 'pointer'}}
            {...props}>
            {children}
        </path>
    );
}

const SunBurst = ({ data, x, y, radius }) => {
    const partition = data => {
        const root = d3.hierarchy(data)
            .sum(d => d.value)
            .sort((a, b) => b.value - a.value);
        return d3
            .partition()
            .size([2 * Math.PI, root.height + 1])(root);
    };

    const [ selected, setSelected ] = useState(null);
    const [ datum, setDatum ] = useState(partition(data).descendants().slice(1));
    const format = d3.format(",d");
    const colorScale = d3
        .scaleOrdinal(d3.quantize(d3.interpolateRainbow, data.children.length + 1));
    const colorPicker = (d) => {
        while (d.depth > 1) {
            d = d.parent;
        }

        return colorScale(d.data.name);
    }

    const arcVisible = (d) => {
        return d.y1 <= 3 && d.y0 >= 1 && d.x1 > d.x0;
    };

    useEffect(() => {
        console.log(selected);
        if (selected !== null) {
            setDatum(prevState => {
                const aaa = data.children.map((d) => {
                    return {
                        ...d,
                        x0: Math.max(0, Math.min(1, (d.x0 - selected.x0) / (selected.x1 - selected.x0))) * 2 * Math.PI,
                        x1: Math.max(0, Math.min(1, (d.x1 - selected.x0) / (selected.x1 - selected.x0))) * 2 * Math.PI,
                        y0: Math.max(0, d.y0 - selected.depth),
                        y1: Math.max(0, d.y1 - selected.depth)
                    }
                });
                console.log(data);
                console.log('prevState', prevState);
                console.log('newnew', aaa);

                return prevState;
            })
        } else {
            setDatum(partition(data).descendants().slice(1));
        }
    }, [ selected ]);

    // console.log(data);
    // console.log(datum);

    return (
        <g transform={`translate(${x}, ${y})`}>
            {
                datum.map((d, index) => {
                    return <Arc 
                        d={d}
                        fill={colorPicker(d)}
                        fillOpacity={arcVisible(d) ? (d.children ? 0.6 : 0.4) : 0}
                        radius={radius}
                        onClick={() => setSelected(d)}
                        key={index}>
                        <title>
                            {
                            `${d.ancestors()
                                .map(d => d.data.name)
                                .reverse()
                                .join("/")}\n
                                ${format(d.value)}`
                            }
                        </title>
                    </Arc>
                })
            }
            <Labels datum={datum} radius={radius} />
            <circle
                r={radius}
                fill="none"
                pointerEvents="all"
                onClick={() => setSelected(null)} />
        </g>
    );
};

export const SunBurstChart = ({ dataset, height, width }) => {
  const [ data, setData ] = useState(null);

  const radius = width / 6;

  useEffect(() => {
    d3.json(dataset, (data) => ({
        ...data
    })).then(data => setData(data));
  }, []);
  

  return (
    data ? (
      <svg width={width} height={height}>
        <SunBurst data={data} x={width / 2} y={height / 2} radius={radius} />
      </svg>
    ) : null
  )
}

Labels.propTypes = {
    datum: PropTypes.array,
    radius: PropTypes.number
}

SunBurst.propTypes = {
  data: PropTypes.object,
  x: PropTypes.number,
  y: PropTypes.number,
  radius: PropTypes.number
};

SunBurstChart.propTypes = {
    dataset: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number
};