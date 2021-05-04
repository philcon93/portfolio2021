import React, { Fragment, useEffect, useState } from "react";
import * as d3 from "d3";
import PropTypes from 'prop-types';
import chroma from "chroma-js";
import { Tooltip } from './tooltip';
import { BottomAxis, LeftAxis } from "./axis";

const Scatterplot = ({ data, allGroup, yScale, xScale, colorScale, hover, unhover }) => {
    const mouseOver = (event, data, item) => {
        const info = {
            name: data.name,
            data: item
        }

        hover(event, info);
    };

    const mouseLeave = () => {
        unhover();
    }

    const dataReady = allGroup.map(grpName => ({
        name: grpName,
        values: data.map(d => ({
            time: d.time,
            value: +d[grpName]
        }))
    }));

    const line = d3.line()
      .x(d => xScale(+d.time))
      .y(d => yScale(+d.value));

    return (
        dataReady.map((d, i) => {
            return <Fragment key={i}>
                <path
                key={i}
                d={line(d.values)}
                style={{ stroke: colorScale(d.name), strokeWidth: 4, fill: 'none' }} />
                <g style={{ fill: colorScale(d.name) }}>
                    {
                        d.values.map((item, i) => {
                            return <Fragment key={i}>
                            <circle
                                cx={xScale(item.time)}
                                cy={yScale(item.value)}
                                r={5}
                                style={{ stroke: '#fff' }}
                                onMouseOver={(e) => mouseOver(e, d, item)} 
                                onMouseLeave={mouseLeave} />
                                {/* {
                                    arr.length - 1 === i ?
                                    <text
                                        transform={`translate(${xScale(item.time)},${yScale(item.value)})`}
                                        x={-40}
                                        y={20}
                                        style={{ fill: colorScale(d.name), fontSize: 15 }}
                                    >{d.name}
                                    </text> : null
                                } */}
                            </Fragment>
                        })
                    }
                </g>
            </Fragment>
        })
    );
};

const GroupedScatterplot = ({ dataset, height, width }) => {
    const yMargin = 40;
    const xMargin = 50;
    const [ data, setData ] = useState(null);
    const allGroup = ["valueA", "valueB", "valueC"]
    const xScale = d3.scaleLinear()
        .domain([ 0, 10 ])
        .range([ 0, width - xMargin ]);
    const yScale = d3.scaleLinear()
        .domain([ 0, 20 ])
        .range([ height - yMargin, 0 ]);
    const colorScale = d3.scaleOrdinal()
        .domain(allGroup)
        .range(chroma.brewer.Pastel1);

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
                <Scatterplot
                    data={data}
                    allGroup={allGroup}
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
                Type: {tooltip.item.name}<br/>
                Value: {tooltip.item.data.value}<br/>
                Time: {tooltip.item.data.time}<br/>
            </Tooltip>
        }
        </>
    ) : null
  )
}

export default GroupedScatterplot;

Scatterplot.propTypes = {
    data: PropTypes.array,
    yScale: PropTypes.func,
    xScale: PropTypes.func,
    colorScale: PropTypes.func,
    hover: PropTypes.func,
    unhover: PropTypes.func
};

GroupedScatterplot.propTypes = {
  dataset: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number
};