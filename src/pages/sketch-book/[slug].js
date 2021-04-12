import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import hydrate from 'next-mdx-remote/hydrate';
import renderToString from 'next-mdx-remote/render-to-string';
import { PostBody, PostHeader } from '../../components/site';
import { sketchesFilePaths, sketchesDirectory } from '../../utilities/api';
import { CMS_NAME } from '../../utilities/constants';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import PropTypes from 'prop-types';

const components = {
  // a: CustomLink,
  AnimatedPieChart: dynamic(() =>
    import('../../components/d3/animated-pie-chart').then((mod) => mod.AnimatedPieChart)),
  AUStates: dynamic(() =>
    import('../../components/d3/australia-states').then((mod) => mod.AUStates)),
  BoxPlot: dynamic(() =>
    import('../../components/d3/box-plot').then((mod) => mod.BoxPlot)),
  CanvasClickMap: dynamic(() =>
    import('../../components/d3/canvas-map-click').then((mod) => mod.CanvasClickMap)),
  CanvasMap: dynamic(() =>
    import('../../components/d3/canvas-map').then((mod) => mod.CanvasMap)),
  CircleAnimation: dynamic(() =>
    import('../../components/d3/circle-animation').then((mod) => mod.CircleAnimation)),
  CarolsWordCloud: dynamic(() =>
    import('../../components/d3/carols-word-cloud').then((mod) => mod.CarolsWordCloud)),
  DensityPlot: dynamic(() =>
    import('../../components/d3/density-plot').then((mod) => mod.DensityPlot)),
  DonutWrapper: dynamic(() =>
    import('../../components/d3/donut').then((mod) => mod.DonutWrapper)),
  GeoMap: dynamic(() =>
    import('../../components/d3/geo-map').then((mod) => mod.GeoMap)),
  GeoMouseover: dynamic(() =>
    import('../../components/d3/geo-mouseover').then((mod) => mod.GeoMouseover)),
  GroupedScatterplot: dynamic(() =>
    import('../../components/d3/grouped-scatterplot').then((mod) => mod.GroupedScatterplot)),
  PackLayout: dynamic(() => 
    import('../../components/d3/pack-layout').then((mod) => mod.PackLayout)),
  MoneyLineChart: dynamic(() =>
    import('../../components/d3/money-line-chart').then((mod) => mod.MoneyLineChart)),
  MovieBarChart: dynamic(() =>
    import('../../components/d3/movie-bar-chart').then((mod) => mod.MovieBarChart)),
  ResponsiveChart: dynamic(() =>
    import('../../components/d3/responsive-chart').then((mod) => mod.ResponsiveChart)),
  Ridgelines: dynamic(() =>
    import('../../components/d3/ridgeline').then((mod) => mod.Ridgelines)),
  RoundDashboard: dynamic(() =>
    import('../../components/d3/round-dashboard').then((mod) => mod.RoundDashboard)),
  Sankey: dynamic(() =>
    import('../../components/d3/sankey').then((mod) => mod.Sankey)),
  StackedChart: dynamic(() =>
    import('../../components/d3/stacked-bar-chart').then((mod) => mod.StackedChart)),
  TreeLayout: dynamic(() =>
    import('../../components/d3/tree-layout').then((mod) => mod.TreeLayout)),
  TreeMapLayout: dynamic(() =>
    import('../../components/d3/treemap-layout').then((mod) => mod.TreeMapLayout)),
  VariableBins: dynamic(() =>
    import('../../components/d3/variable-bins').then((mod) => mod.VariableBins)),
  ViolinPlot: dynamic(() =>
    import('../../components/d3/violin-plot').then((mod) => mod.ViolinPlot)),
  XmasTrees: dynamic(() =>
    import('../../components/d3/xmas-trees').then((mod) => mod.XmasTrees))
}

export default function Post({ source, frontMatter}) {
  const content = hydrate(source, { components });

  return (
    <>
      <article className="mb-32">
        <Head>
          <title>{CMS_NAME} | {frontMatter.title}</title>
        </Head>
        <PostHeader
          title={frontMatter.title}
          date={frontMatter.date}
          excerpt={frontMatter.excerpt}
          tags={frontMatter.tags} />
        <PostBody content={content} />
      </article>
    </>
  )
}

export const getStaticProps = async ({ params }) => {
  const postFilePath = path.join(sketchesDirectory, `${params.slug}.mdx`);
  const source = fs.readFileSync(postFilePath);

  const { content, data } = matter(source);

  const mdxSource = await renderToString(content, { components });

  return {
    props: {
      source: mdxSource,
      frontMatter: data
    },
  }
}

export const getStaticPaths = async () => {
  const paths = sketchesFilePaths
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.mdx?$/, ''))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug } }))

  return {
    paths,
    fallback: false
  }
}

Post.propTypes = {
  source: PropTypes.object,
  frontMatter: PropTypes.object
};