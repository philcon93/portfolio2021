import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import { PostBody, PostHeader, PostTitle } from '../../components';
import { getContent, getAllPosts } from '../../utilities/api';
import { CMS_NAME } from '../../utilities/constants';
import Head from 'next/head';
import markdownToHtml from '../../utilities/markdownToHtml';
import PropTypes from 'prop-types';

export default function Post({ post }) {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <>
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article className="mb-32">
              <Head>
                <title>{CMS_NAME} | {post.title}</title>
                <meta property="og:image" content={post.ogImage.url} />
              </Head>
              <PostHeader
                title={post.title}
                date={post.date} />
              <PostBody content={post.content} />
            </article>
          </>
        )}
    </>
  )
}

export async function getStaticProps({ params }) {
  const post = getContent(params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'ogImage',
    'coverImage',
  ])
  const content = await markdownToHtml(post.content || '')

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  }
}

export async function getStaticPaths() {
  const posts = getAllPosts(['slug'])

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: false,
  }
}

Post.propTypes = {
  post: PropTypes.object
};