import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import PropTypes from 'prop-types';
import { useD3 } from "d3blackbox";

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

const Violins = ({ data, yScale, xScale, x, y }) => {
    const histogram = d3.bin()
        .domain(yScale.domain())
        .thresholds(yScale.ticks(20))    // Important: how many bins approx are going to be made? It is the 'resolution' of the violin plot
        .value(d => d);

    // Compute the binning for each group of the dataset
    // const groups = d3.group(data, d => d.Species)  // nest function allows to group the calculation per level of a factor
    const sumstat = d3.rollup(data, v => histogram(d => d.Sepal_Length), d => d.Species);  // For each key..

    // console.log(sumstat);

      // What is the biggest number of value in a bin? We need it cause this value will have a width of 100% of the bandwidth.
    let maxNum = 0;
    sumstat.forEach((value, key) => {
        console.log(value, key);

        const allBins = value;
        console.log(allBins);
        const lengths = allBins.map((a) => a.length);
        const longest = d3.max(lengths);

        if (longest > maxNum) { maxNum = longest }
    });

    console.log(maxNum);

    const xNum = d3.scaleLinear()
        .range([0, xScale.bandwidth()])
        .domain([ -maxNum, maxNum ]);

    return [...sumstat].map((data, i) => {
        return (
            <g key={i} transform={`translate(${xScale(data[0])}, ${y})`}>
                {
                    data[1].map((d, i) => {
                        const area = d3.area()
                            .x0(xNum(-d.length))
                            .x1(xNum(d.length))
                            .y(d.x0)
                            .curve(d3.curveCatmullRom);

                        // console.log(area(d))

                        return <path
                            key={i}
                            d={area(d)}
                            style={{ stroke: "none", fill: "#69b3a2"}} />
                    })
                }
            </g>
        );
    });
};

export const ViolinPlot = ({ dataset, height, width }) => {
    const yMargin = 40;
    const [ data, setData ] = useState(null);
    const yScale = d3.scaleLinear()
        .domain([ 3.5, 8 ])          // Note that here the Y scale is set manually
        .range([height - yMargin, 0]);
    // Build and Show the X scale. It is a band scale like for a boxplot: each group has an dedicated RANGE on the axis. This range has a length of x.bandwidth
    const xScale = d3.scaleBand()
        .range([ 0, width ])
        .domain(["setosa", "versicolor", "virginica"])
        .padding(0.05);     // This is important: it is the space between 2 groups. 0 means no padding. 1 is the maximum.

    useEffect(() => {
        d3.csv(dataset, (data) => ({
            ...data
        })).then(data => setData(data));
    }, []);

  return (
    data ? (
      <svg width={width} height={height}>
        <g transform={`translate(40, 10)`}>
        <Violins data={data} yScale={yScale} xScale={xScale} width={width} y={0} />
        <BottomAxis scale={xScale} x={0} y={height - yMargin} />
        <LeftAxis scale={yScale} x={0} y={0} />
        </g>
      </svg>
    ) : null
  )
}

ViolinPlot.propTypes = {
  dataset: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number
};