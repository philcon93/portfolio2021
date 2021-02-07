import { Intro, Posts } from '../../components';
import { getAllPosts, postsDirectory } from '../../utilities/api';
import Head from 'next/head';
import { CMS_NAME } from '../../utilities/constants';
import PropTypes from 'prop-types';

export default function Index({ posts }) {
  return (
    <>
        <Head>
          <title>{CMS_NAME} | Blog</title>
        </Head>
        <Intro
          title="Blog."
          subtitle={
            <>
              A statically generated blog of my thoughts, using{' '}
              <a
                href="https://nextjs.org/"
                className="underline hover:text-success duration-200 transition-colors"
              >Next.js</a>.
            </> 
          } />
        {
          posts.length > 0 ? <Posts directory="blog" posts={posts} /> : null
        }
    </>
  )
}

export async function getStaticProps() {
  const posts = getAllPosts(
    [ 'date', 'excerpt', 'title', 'slug' ],
    postsDirectory
  );

  return {
    props: { posts },
  }
}

Index.propTypes = {
  posts: PropTypes.array
};
