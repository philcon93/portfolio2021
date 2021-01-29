import { Intro, BlogPosts } from '../../components';
import { getAllPosts } from '../../utilities/api';
import Head from 'next/head';
import { CMS_NAME } from '../../utilities/constants';

export default function Index({ allPosts }) {
  return (
    <>
        <Head>
          <title>{CMS_NAME} | Blog</title>
        </Head>
        <Intro />
        <BlogPosts posts={allPosts} />
    </>
  )
}

export async function getStaticProps() {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
  ])

  return {
    props: { allPosts },
  }
}