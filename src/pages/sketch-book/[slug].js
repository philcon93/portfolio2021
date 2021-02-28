import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import hydrate from 'next-mdx-remote/hydrate';
import renderToString from 'next-mdx-remote/render-to-string';
import { PostBody, PostHeader } from '../../components';
import { sketchesFilePaths, sketchesDirectory } from '../../utilities/api';
import { CMS_NAME } from '../../utilities/constants';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import PropTypes from 'prop-types';

const components = {
  // a: CustomLink,
  AnimatedPieChart: dynamic(() =>
    import('../../components/dataviz/animated-pie-chart').then((mod) => mod.AnimatedPieChart)),
  CarolsWordCloud: dynamic(() =>
    import('../../components/dataviz/carols-word-cloud').then((mod) => mod.CarolsWordCloud)),
  DonutWrapper: dynamic(() =>
    import('../../components/dataviz/donut').then((mod) => mod.DonutWrapper)),
  StackedChart: dynamic(() => 
    import('../../components/dataviz/stacked-bar-chart').then((mod) => mod.StackedChart)),
  MoneyLineChart: dynamic(() =>
    import('../../components/dataviz/money-line-chart').then((mod) => mod.MoneyLineChart)),
  MovieBarChart: dynamic(() =>
    import('../../components/dataviz/movie-bar-chart').then((mod) => mod.MovieBarChart)),
  XmasTrees: dynamic(() =>
    import('../../components/dataviz/xmas-trees').then((mod) => mod.XmasTrees))
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
          date={frontMatter.date} />
          {
            frontMatter.excerpt &&
              <p>{frontMatter.excerpt}</p>
          }
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