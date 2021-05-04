import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import PropTypes from 'prop-types';
import { useD3 } from "d3blackbox";
import { Tooltip } from "./tooltip";

const LeftAxis = ({ scale, x, y }) => {
    const refAnchor = useD3(anchor => {
        const axis = d3.axisLeft().scale(scale);

        d3.select(anchor).call(axis);
    });

    return <g ref={refAnchor} transform={`translate(${x}, ${y})`} />;
};

const BottomAxis = ({ scale, x, y }) => {
    const refAnchor = useD3(anchor => {
        const axis = d3.axisBottom().scale(scale);

        d3.select(anchor).call(axis);
    });

    return <g ref={refAnchor} transform={`translate(${x}, ${y})`} />;
};

const Squares = ({ data, yScale, xScale, colorScale, hover, unhover }) => {
    const mouseOver = (event, data) => hover(event, data);
    const mouseLeave = () => unhover();

    return (
        data.map((d, i) => {
            return <rect
                key={i}
                x={xScale(d.group)}
                y={yScale(d.variable)}
                width={xScale.bandwidth()}
                height={yScale.bandwidth()}
                style={{ fill: colorScale(d.value) }}
                onMouseOver={(e) => mouseOver(e, d)} 
                onMouseLeave={mouseLeave} />
        })
    );
};

const HeatMap = ({ dataset, height, width }) => {
    const yMargin = 40;
    const xMargin = 50;
    const [ data, setData ] = useState(null);
    const myGroups = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    const myVars = ["v1", "v2", "v3", "v4", "v5", "v6", "v7", "v8", "v9", "v10"];
    const xScale = d3.scaleBand()
        .domain(myGroups)
        .range([ 0, width - xMargin ])
        .padding(0.01);
    const yScale = d3.scaleBand()
        .domain(myVars)
        .range([ height - yMargin, 0 ])
        .padding(0.01);
    const colorScale = d3.scaleLinear()
        .range(["#ffffff", "#69b3a2"])
        .domain([1,100]);

    const initState = {
        show: false,
        value: 0,
        leftPos: 0,
        topPos: 0
    };
    const [ tooltip, setTooltip ] = useState(initState)

    const hover = (event, item) => {
        setTooltip({
            show: true,
            item: item,
            leftPos: event.pageX + 10,
            topPos: event.pageY + 10
        })
    };

    useEffect(() => {
        d3.csv(dataset, (data) => ({
            ...data
        })).then(data => setData(data));
    }, []);

  return (
    data ? (
        <>
        <svg width={width} height={height}>
            <g transform={`translate(40, 10)`}>
                <Squares
                    data={data}
                    yScale={yScale}
                    xScale={xScale}
                    colorScale={colorScale}
                    hover={hover}
                    unhover={() => setTooltip(initState)}/>
                <LeftAxis scale={yScale} x={0} y={0} />
                <BottomAxis scale={xScale} x={0} y={height - yMargin} />
            </g>
        </svg>
        {
            tooltip.show &&
            <Tooltip show={tooltip.show} topPos={tooltip.topPos} leftPos={tooltip.leftPos}>
                This cell is: {tooltip.item.value}<br/>
            </Tooltip>
        }
        </>
    ) : null
  )
}

export default HeatMap;

LeftAxis.propTypes = {
    scale: PropTypes.func,
    x: PropTypes.number,
    y: PropTypes.number
};

BottomAxis.propTypes = {
    scale: PropTypes.func,
    x: PropTypes.number,
    y: PropTypes.number
};

Squares.propTypes = {
    data: PropTypes.array,
    yScale: PropTypes.func,
    xScale: PropTypes.func,
    colorScale: PropTypes.func,
    hover: PropTypes.func,
    unhover: PropTypes.func
};

HeatMap.propTypes = {
  dataset: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number
};