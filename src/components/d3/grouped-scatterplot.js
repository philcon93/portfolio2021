import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import PropTypes from 'prop-types';
import { useD3 } from "d3blackbox";
import chroma from "chroma-js";

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

const Scatterplot = ({ data, yScale, xScale, colorScale, hover, unhover }) => {
    const [ species, setSpecies ] = useState('');

    const mouseOver = (event, data) => {
        setSpecies(data.Species);
        hover(event, data);
    };

    const mouseLeave = () => {
        setSpecies('');
        unhover();
    }

    return (
        data.map((d, i) => {
            return <circle
                key={i}
                cx={xScale(d.Sepal_Length)}
                cy={yScale(d.Petal_Length)}
                r={species === d.Species ? 6 : 5}
                style={{ fill: species === d.Species ? colorScale(d.Species) : 'lightgrey' }}
                onMouseOver={(e) => mouseOver(e, d)} 
                onMouseLeave={mouseLeave} />
        })
    );
};

export const GroupedScatterplot = ({ dataset, height, width }) => {
    const yMargin = 40;
    const xMargin = 50;
    const [ data, setData ] = useState(null);
    const xScale = d3.scaleLinear()
        .domain([ 3.5, 8 ])
        .range([ 0, width - xMargin ]);
    const yScale = d3.scaleLinear()
        .domain([ 0, 9 ])
        .range([ height - yMargin, 0 ]);
    const colorScale = d3.scaleOrdinal()
        .domain(["setosa", "versicolor", "virginica"])
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
                Species: {tooltip.item.Species}<br/>
                Sepal length: {tooltip.item.Sepal_Length}<br/>
                Petal length: {tooltip.item.Petal_Length}<br/>
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