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
  AnimatedPieChart: dynamic(() => import('../../components/d3/animated-pie-chart')),
  AUStates: dynamic(() => import('../../components/d3/australia-states')),
  BubbleChart: dynamic(() => import('../../components/d3/bubble-chart')),
  BoxPlot: dynamic(() => import('../../components/d3/box-plot')),
  CanvasClickMap: dynamic(() => import('../../components/d3/canvas-map-click')),
  CanvasMap: dynamic(() => import('../../components/d3/canvas-map')),
  CircleAnimation: dynamic(() => import('../../components/d3/circle-animation')),
  CarolsWordCloud: dynamic(() => import('../../components/d3/carols-word-cloud')),
  ConnectedScatterplot: dynamic(() => import('../../components/d3/connected-scatterplot')),
  DensityPlot: dynamic(() => import('../../components/d3/density-plot')),
  DonutWrapper: dynamic(() => import('../../components/d3/donut')),
  GeoMap: dynamic(() => import('../../components/d3/geo-map')),
  GeoMouseover: dynamic(() => import('../../components/d3/geo-mouseover')),
  GroupedScatterplot: dynamic(() => import('../../components/d3/grouped-scatterplot')),
  HeatMap: dynamic(() => import('../../components/d3/heatmap')),
  PackLayout: dynamic(() =>  import('../../components/d3/pack-layout')),
  MoneyLineChart: dynamic(() => import('../../components/d3/money-line-chart')),
  MovieBarChart: dynamic(() => import('../../components/d3/movie-bar-chart')),
  Replace: dynamic(() => import('../../components/site/replace')),
  ResponsiveChart: dynamic(() => import('../../components/d3/responsive-chart')),
  Ridgelines: dynamic(() => import('../../components/d3/ridgeline')),
  RoundDashboard: dynamic(() => import('../../components/d3/round-dashboard')),
  Sankey: dynamic(() => import('../../components/d3/sankey')),
  Shadingplot: dynamic(() => import('../../components/d3/shading-plot')),
  SpinningCubes: dynamic(() => import('../../components/three/spinning-cubes')),
  Scene: dynamic(() => import('../../components/three/avatar-scene')),
  StackedChart: dynamic(() => import('../../components/d3/stacked-bar-chart')),
  TreeLayout: dynamic(() => import('../../components/d3/tree-layout')),
  TreeMapLayout: dynamic(() => import('../../components/d3/treemap-layout')),
  VariableBins: dynamic(() => import('../../components/d3/variable-bins')),
  ViolinPlot: dynamic(() => import('../../components/d3/violin-plot')),
  XmasTrees: dynamic(() => import('../../components/d3/xmas-trees'))
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