import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import hydrate from 'next-mdx-remote/hydrate';
import renderToString from 'next-mdx-remote/render-to-string';
import { PostBody, PostHeader } from '../../components';
import { postsFilePaths, postsDirectory } from '../../utilities/api';
import { CMS_NAME } from '../../utilities/constants';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import PropTypes from 'prop-types';

const components = {
  // a: CustomLink,
  PostTitle: dynamic(() =>
    import('../../components/post-title').then((mod) => mod.PostTitle)),
  // PostTitle: PostTitle
}

export default function Post({ source, frontMatter}) {
  const content = hydrate(source, { components });

  return (
    <>
      <article className="mb-32">
        <Head>
          <title>{CMS_NAME} | {frontMatter.title}</title>
          <meta property="og:image" content={frontMatter.ogImage.url} />
        </Head>
        <PostHeader
          title={frontMatter.title}
          date={frontMatter.date} />
        <PostBody content={content} />
      </article>
    </>
  )
}

export const getStaticProps = async ({ params }) => {
  const postFilePath = path.join(postsDirectory, `${params.slug}.mdx`);
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
  const paths = postsFilePaths
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