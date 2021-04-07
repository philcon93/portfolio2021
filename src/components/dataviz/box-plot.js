import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import PropTypes from 'prop-types';
import { useD3 } from "d3blackbox";

const LeftAxis = ({ scale, x, y }) => {
    const refAnchor = useD3(anchor => {
        const axis = d3.axisLeft().scale(scale).tickSize(0);

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

const Box = ({ sumstat, yScale, xScale }) => {
    return [...sumstat].map((data, i) => {
        return (
            <g key={i}>
                <line
                    x1={xScale(data[1].min)} 
                    x2={xScale(data[1].max)} 
                    y1={yScale(data[0]) + yScale.bandwidth() / 2} 
                    y2={yScale(data[0]) + yScale.bandwidth() / 2}
                    style={{ stroke: '#000' }}/>
                <rect
                    x={xScale(data[1].q1)} 
                    y={yScale(data[0])} 
                    width={xScale(data[1].q3) - xScale(data[1].q1)} 
                    height={yScale.bandwidth()}
                    style={{ stroke: '#000', fill: '#69b3a2', opacity: 0.4 }}/>
                <line
                    x1={xScale(data[1].median)} 
                    x2={xScale(data[1].median)} 
                    y1={yScale(data[0])} 
                    y2={yScale(data[0]) + yScale.bandwidth() / 2}
                    style={{ stroke: '#000' }} />
            </g>
        );
    });
};

const Boxes = ({ data, yScale, xScale, colorScale }) => {
    const jitterWidth = 50;
    const sumstat = d3.group(data, d => d.Species);

    sumstat.forEach((value, key) => {
        const input = value.map(v => v.Sepal_Length).sort(d3.ascending);
        const q1 = d3.quantile(input, .25);
        const median = d3.quantile(input, .5);
        const q3 = d3.quantile(input, .75);
        const interQuantileRange = q3 - q1;
        const min = q1 - 1.5 * interQuantileRange;
        const max = q3 + 1.5 * interQuantileRange;

        sumstat.set(key, {
            q1: q1,
            median: median,
            q3: q3,
            interQuantileRange: interQuantileRange,
            min: min,
            max: max
          });
    });

    return (
        <>
            <Box sumstat={sumstat} yScale={yScale} xScale={xScale} />
            <g>
            {
                data.map((d, i) => {
                    console.log(d);
                    return <circle
                        key={i}
                        cx={xScale(d.Sepal_Length)}
                        cy={yScale(d.Species) + (yScale.bandwidth()/2) - jitterWidth/2 + Math.random()*jitterWidth}
                        r={4}
                        style={{ fill: colorScale(d.Sepal_Length), stroke: '#000' }}
                        // onMouseOver={(event) => hover(event, d)}
                        // onMouseOut={() => unhover()}
                        />
                })
            }
            </g>
        </>
    );
};

export const BoxPlot = ({ dataset, height, width }) => {
    const yMargin = 40;
    const xMargin = 50;
    const xDomain = [ 3.5, 8 ];
    const [ data, setData ] = useState(null);
    const xScale = d3.scaleLinear()
        .domain(xDomain)
        .range([ 0, width - xMargin ]);
    const yScale = d3.scaleBand()
        .domain(["setosa", "versicolor", "virginica"])
        .range([ height - yMargin, 0 ])
        .padding(.4);
    const colorScale = d3.scaleSequential()
        .domain(xDomain)
        .interpolator(d3.interpolateInferno);
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
            value: item.Sepal_Length,
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
                    <Boxes
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
        { tooltip.show &&
            <div style={{
                backgroundColor: '#000',
                border: 'none',
                borderRadius: '5px',
                padding: '15px',
                minWidth: '200px',
                color: '#fff',
                position: 'absolute',
                top: tooltip.topPos,
                left: tooltip.leftPos
                }}>
                Sepal length: {tooltip.value}
            </div> }
        </>
    ) : null
  )
}

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

Boxes.propTypes = {
    data: PropTypes.array,
    yScale: PropTypes.func,
    xScale: PropTypes.func,
    colorScale: PropTypes.func,
    hover: PropTypes.func,
    unhover: PropTypes.func
};

BoxPlot.propTypes = {
  dataset: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number
};