import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { sankey, sankeyLinkHorizontal } from "d3-sankey";
import chroma from "chroma-js";
import PropTypes from 'prop-types';

const SankeyNode = ({
    name, x0, x1, y0, y1, color, value, hover, unhover
}) => {
    return <rect
        x={x0}
        y={y0}
        width={x1 - x0}
        height={y1 - y0}
        fill={color}
        onMouseOver={hover}
        onMouseOut={unhover}>
      <title>{name} - {value}</title>
    </rect>
};

const SankeyLink = ({ link, color }) => {
    return <path
      d={sankeyLinkHorizontal()(link)}
      style={{
        fill: "none",
        strokeOpacity: ".3",
        stroke: color,
        strokeWidth: Math.max(1, link.width)
      }}
    />
};

const SankeyText = ({ name, x0, x1, y0, y1, width }) => {
    return <text
    x={x0 < width / 2 ? x1 + 6 : x0 - 6}
    y={(y1 + y0) / 2}
    dy="0.35em"
    style={{
        textAnchor: x0 < width / 2 ? "start" : "end",
        fontSize: '9px'
    }}>{name}</text>
};

const SnakeyWrapper = ({ data, width, height }) => {
    const [ selected, setSelected ] = useState(null);
    const { nodes, links } = sankey()
        .nodeWidth(15)
        .nodePadding(25)
        .extent([[1, 1], [width - 1, height - 5]])(data);
    const color = chroma.scale("Set3").classes(nodes.length);
    const colorScale = d3
          .scaleLinear()
          .domain([0, nodes.length])
          .range([0, 1]);

    useEffect(() => {
        return () => setSelected(null)
    }, []);

    return (
        <>
            <g style={{ mixBlendMode: "multiply" }}>
                {nodes.map((node, index) => (
                    <SankeyNode
                        {...node}
                        color={color(colorScale(index)).hex()}
                        key={node.name}
                        hover={() => setSelected(node)}
                        unhover={() => setSelected(null)}/>
                ))}
                {links.map((link, index) => {
                    const selectedNode = () => {
                        if (selected === null) {
                            return true;
                        }
                        if ((link.source.name === selected.name) || (link.target.name === selected.name)) {
                            return true;
                        } else {
                            return false;
                        }
                    };

                    return <SankeyLink
                        key={index}
                        link={link}
                        color={
                            color(colorScale(link.source.index))
                                .alpha(selectedNode() ? 1 : 0.2)
                                .hex()
                            } />
                })}
            </g>
            <g>
                {nodes.map((node, index) => {
                    return <SankeyText
                        key={index}
                        width={width}
                        {...node} />
                })}
            </g>
        </>
    );
};

export const Sankey = ({ dataset, height, width }) => {
    const [ data, setData ] = useState(null);
    const [ chartWidth, setWidth ] = useState(0);
    const [ chartHeight, setHeight ] = useState(0);
    const ref = useRef(null);

    useEffect(() => {
        d3.json(dataset, (data) => ({
            ...data
        })).then(data => setData(data));
    }, []);

    const measureSVG = () => {
        const { width, height } = ref.current.getBoundingClientRect();

        setWidth(width);
        setHeight(height);
    };

    useEffect(() => {
        measureSVG();
        window.addEventListener("resize", measureSVG);

        return () => window.removeEventListener("resize", measureSVG);
    }, []);

    return (
        <svg width={width} height={height} ref={ref}>
            {
                data &&
                <SnakeyWrapper data={data} width={chartWidth} height={chartHeight} />
            }
        </svg>
    )
}

SankeyNode.propTypes = {
    name: PropTypes.string,
    x0: PropTypes.number,
    x1: PropTypes.number,
    y0: PropTypes.number,
    y1: PropTypes.number,
    color: PropTypes.string,
    value: PropTypes.number,
    hover: PropTypes.func,
    unhover: PropTypes.func
};

SankeyLink.propTypes = {
    link: PropTypes.object,
    color: PropTypes.string
};

SankeyText.propTypes = {
    name: PropTypes.string,
    x0: PropTypes.number,
    x1: PropTypes.number,
    y0: PropTypes.number,
    y1: PropTypes.number,
    width: PropTypes.number
};

SnakeyWrapper.propTypes = {
    data: PropTypes.object,
    width: PropTypes.number,
    height: PropTypes.number
};

Sankey.propTypes = {
    dataset: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.string
};