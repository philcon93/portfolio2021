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
      .cornerRadius(8);

    const [ d, setD ] = useState(props.d);
    const [ pathD, setPathD ] = useState(arc(props.d));

    useEffect(() => {
        setColor(props.color);

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
    };
  
    const unhover = () => {
      setColor(origCol);
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

const PieChart = ({ color, groupBy, data, x, y, r }) => {
    const [ selected, setSelected ] = useState(null);
    const pie = d3
        .pie()
        .value(d => d.amount)
        .sortValues(d => d.item);
    const arc = d3
        .arc()
        .innerRadius(90)
        .outerRadius(r)
        .padAngle(0.01);

    const _data = groupByFunc(data, groupBy);

    return (
        <g transform={`translate(${x}, ${y})`}>
          {
            pie(_data).map((d, index) =>
            //   <path
            //     d={arc
            //       .innerRadius(selected === d.index ? 85 : 90)
            //       .outerRadius(selected === d.index ? r + 10 : r)
            //       .padAngle(selected === d.index ? 0.03 : 0.01)(d)}
            //     fill={color(d)}
            //     onMouseOver={() => setSelected(d.index)}
            //     onMouseOut={() => setSelected(null)}
            //     key={index} />
                <Arc d={d} color={color(d)} key={index} />
            )
          }
            <text x="0" textAnchor="middle">
                {data.length}
            </text>
            <text y="18" x="0" textAnchor="middle">
                datapoints
            </text>
        </g>
    );
};

export const AnimatedPieChart = ({ dataset, height, width }) => {
  const [ data, setData ] = useState([]);
  const [ trickle, setTrickle ] = useState(false);
  const [ cachedData, setCachedData ] = useState([]);
  const [ cacheIndex, setCacheIndex ] = useState(0);
  let colorScale = chroma.scale("PuBu").domain([1,0]);
  let colorIndex = d3.scaleOrdinal();
  let timer = null;

  useEffect(() => {
    d3.csv(dataset, (data) => ({
        ...data,
        amount: Number(data["Amount"].replace(",", ""))
    })).then(data => {
        const items = Object.keys(
            groupByFunc(data, d => d.Item.split(", ").sort())
        );

        console.log(items);
    
        colorScale.colors(items);
        colorIndex
            .domain(items)
            .range(items.map((_, index) => index / items.length));

        console.log(colorScale(0.5))

        setData(data);
        setCacheIndex(0);
        // startTrickle();
    });
  }, []);

//   useEffect(() => {
//       if (trickle) {
    const startTrickle = () => {
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
    };

//       return () => stop();
//   }, [ data ])

  const stop = () => {
    clearInterval(timer);
  };

  return (
    data.length > 0 ? (
      <svg width={width} height={height}>
        <PieChart
            data={data}
            color={d => {
                // console.log(colorScale(colorIndex(d.data.item)));
                return colorScale(colorIndex(d.data.item));
            }}
            groupBy={(d) => d.Item.split(", ").sort()}
            x={200}
            y={200}
            r={150} />
      </svg>
    ) : null
  )
}

PieChart.propTypes = {
    color: PropTypes.func,
    data: PropTypes.array,
    groupBy: PropTypes.func,
    x: PropTypes.number,
    y: PropTypes.number,
    r: PropTypes.number
};

AnimatedPieChart.propTypes = {
    dataset: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number
};