import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import PropTypes from 'prop-types';
import { useD3 } from "d3blackbox";
import d3legend from "d3-svg-legend";

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

const Legend = function({ x, y, colorScale }) {
    const ref = useD3(anchor => {
      d3.select(anchor).call(d3legend.legendColor().scale(colorScale).shape('circle'));
    });
  
    return <g transform={`translate(${x}, ${y})`} ref={ref} />;
};

const Bubbles = ({ data, yScale, xScale, sizeScale, colorScale, hover, unhover }) => {
    const [ active, setActive ] = useState(false) 
    const mouseOver = (event, data) => {
        hover(event, data);
        setActive(data.country);
    }
    const mouseLeave = () => {
        unhover();
        setActive(false);
    }

    return (
        data.map((d, i) => {
            return <circle
                key={i}
                cx={xScale(d.gdpPercap)}
                cy={yScale(d.lifeExp)}
                r={sizeScale(d.pop)}
                style={{
                    fill: colorScale(d.continent),
                    strokeWidth: '2px',
                    stroke: active === d.country ? '#000' : '#fff'
                }}
                onMouseOver={(e) => mouseOver(e, d)} 
                onMouseLeave={mouseLeave} />
        })
    );
};

const BubbleChart = ({ dataset, height, width }) => {
    const yMargin = 40;
    const xMargin = 50;
    const [ data, setData ] = useState(null);
    const continent = ["Asia", "Europe", "Americas", "Africa", "Oceania"];
    const xScale = d3.scaleLinear()
        .domain([0, 12000])
        .range([ 0, width - xMargin ]);
    const yScale = d3.scaleLinear()
        .domain([35, 90])
        .range([ height - yMargin, 0 ]);
    const sizeScale = d3.scaleLinear()
        .domain([200000, 1310000000])
        .range([ 4, 40]);
    const colorScale = d3.scaleOrdinal()
        .domain(continent)
        .range(d3.schemeSet2);

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
                <Bubbles
                    data={data}
                    yScale={yScale}
                    xScale={xScale}
                    sizeScale={sizeScale}
                    colorScale={colorScale}
                    hover={hover}
                    unhover={() => setTooltip(initState)}/>
                <Legend x={width - 140} y={height - 150} colorScale={colorScale} />
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
                Country: {tooltip.item.country}
            </div> }
        </>
    ) : null
  )
}

export default BubbleChart;

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

Legend.propTypes = {
    colorScale: PropTypes.func,
    x: PropTypes.number,
    y: PropTypes.number
};

Bubbles.propTypes = {
    data: PropTypes.array,
    yScale: PropTypes.func,
    xScale: PropTypes.func,
    sizeScale: PropTypes.func,
    colorScale: PropTypes.func,
    hover: PropTypes.func,
    unhover: PropTypes.func
};

BubbleChart.propTypes = {
  dataset: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number
};