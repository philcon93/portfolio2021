import { SketchIntro, Posts } from '../../components';
import { getSketchSlugs } from '../../utilities/api';
import Head from 'next/head';
import { CMS_NAME } from '../../utilities/constants';

export default function Index({ sketches }) {
  return (
    <>
        <Head>
          <title>{CMS_NAME} | Sketches</title>
        </Head>
        <SketchIntro />
        {
          sketches.length > 0 ? <Posts posts={sketches} /> : null
        }
    </>
  )
}

export async function getStaticProps() {
    console.log(getSketchSlugs())

    return {
        props: { sketches: [] },
    }
}