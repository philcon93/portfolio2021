import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import chroma from "chroma-js";
import PropTypes from 'prop-types';

const groupByFunc = (data, groupBy) => {
    const grouped = data.reduce((acc, val) => {
      const key = groupBy(val);
      if (acc[key]) {
        acc[key] = [...acc[key], val];
      } else {
        acc[key] = [val];
      }
      return acc;
    }, {});
  
    return Object.entries(grouped).map(([item, values]) => ({
        item: item,
        amount: values.map(d => d.amount).reduce((m, n) => m + n, 0)
    }));
};

const arcTween = (oldData, newData, arc) => {
    const dataCopy = { ...oldData };

    return () => {
        const startAngle = d3.interpolate(
            oldData.startAngle,
            newData.startAngle
        );
        const endAngle = d3.interpolate(
            oldData.endAngle,
            newData.endAngle
        );
  
      return (t) => {
        dataCopy.startAngle = startAngle(t);
        dataCopy.endAngle = endAngle(t);
        return arc(dataCopy);
      };
    };
};

const Arc = (props) =>  {
    const [ color, setColor] = useState(props.color);
    const [ origCol, setOrigCol ]  = useState(props.color);

    const ref = useRef();
    const arc = d3
      .arc()
      .innerRadius(80)
      .outerRadius(150)
      .cornerRadius(8)
      .padAngle(0.01);

    const [ d, setD ] = useState(props.d);
    const [ pathD, setPathD ] = useState(arc(props.d));

    useEffect(() => {
        setColor(props.color);
        setOrigCol(props.color);

        d3.select(ref.current)
        .transition()
        .duration(80)
        .attr("d", arc(props.d))
        .attrTween("d", arcTween(d, props.d, arc))
        .on("end", () => {
            setD(props.d);
            setPathD(arc(props.d));
        });
    }, [props.color, props.d]);
  
    const hover = () => {
      setColor(color.saturate(2));
      if (props.onMouseOver) {
        props.onMouseOver();
      }
    };
  
    const unhover = () => {
      setColor(origCol);
      if (props.onMouseOut) {
        props.onMouseOut();
      }
    };
  
    return (
        <path
            d={pathD}
            style={{ fill: color }}
            onMouseOver={hover}
            onMouseOut={unhover}
            ref={ref}
        />
    );
};

const PieChart = ({ groupBy, data, x, y }) => {
    const [ selected, setSelected ] = useState(null);
    const pie = d3
        .pie()
        .value(d => d.amount)
        .sortValues(d => d.item);
    const items = Object.keys(groupByFunc(data, groupBy));
    const colorScale = chroma.scale("PuBu");
    const colorIndex = d3.scaleOrdinal()
        .domain(items)
        .range(items.map((_, index) => index / items.length));

    const _data = groupByFunc(data, groupBy);

    return (
        <g transform={`translate(${x}, ${y})`}>
          {
            pie(_data).map((d, index) => {
                return (
                    <Arc
                        d={d}
                        color={colorScale(colorIndex(d.data.item))}
                        onMouseOver={() => setSelected(d.index)}
                        onMouseOut={() => setSelected(null)}
                        key={index} />
                );
            })}
            {
                selected !== null ?
                    <>
                        <text x="0" textAnchor="middle">
                            {_data[selected].item}
                        </text>
                        <text y="18" x="0" textAnchor="middle">
                            ${_data[selected].amount.toFixed(2)}
                        </text>
                    </> :
                    <>
                        <text x="0" textAnchor="middle">
                            {data.length}
                        </text>
                        <text y="18" x="0" textAnchor="middle">
                            datapoints
                        </text>
                    </>
            }
        </g>
    );
};

const AnimatedPieChart = ({ dataset, title, height, width }) => {
  const [ data, setData ] = useState([]);
  const [ trickle, setTrickle ] = useState(false);
  const [ cachedData, setCachedData ] = useState([]);
  const [ cacheIndex, setCacheIndex ] = useState(0);
  let timer = null;

  useEffect(() => {
    d3.csv(dataset, (data) => ({
        ...data,
        amount: Number(data["Amount"].replace(",", ""))
    })).then(data => {
        setCachedData(data);
        setCacheIndex(0);
        setTrickle(true);
    });
    return () => {
        setData([]);
        setCachedData([]);
        setCacheIndex(0);
    }
  }, []);

  useEffect(() => {
      if (trickle) {
        timer = setInterval(() => {
            if (cacheIndex < cachedData.length) {
                setData(prevState => {
                    return [
                        ...prevState,
                        cachedData[cacheIndex]
                    ]
                });
                setCacheIndex(cacheIndex + 1);
            } else {
            stop();
            }
        }, 100);
    }
    return () => stop();
  }, [ trickle, cacheIndex, cachedData ])

  const stop = () => {
    clearInterval(timer);
  };

  return (
    <>
    { title && <p>{title}</p> }
    { data.length > 0 ? (
      <svg width={width} height={height}>
        <PieChart
            data={data}
            groupBy={(d) => d.Group.split(", ").sort()}
            x={200}
            y={200}
            r={150} />
      </svg>
    ) : null }
    </>
  )
}

export default AnimatedPieChart;

Arc.propTypes = {
    color: PropTypes.object,
    d: PropTypes.object,
    onMouseOver: PropTypes.func,
    onMouseOut: PropTypes.func
}

PieChart.propTypes = {
    data: PropTypes.array,
    groupBy: PropTypes.func,
    x: PropTypes.number,
    y: PropTypes.number
};

AnimatedPieChart.propTypes = {
    dataset: PropTypes.string,
    title: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number
};