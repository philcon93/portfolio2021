import { Intro, Posts } from '../../components';
import { getSketchSlugs } from '../../utilities/api';
import Head from 'next/head';
import { CMS_NAME } from '../../utilities/constants';
import PropTypes from 'prop-types';

export default function Index({ sketches }) {
  return (
    <>
        <Head>
          <title>{CMS_NAME} | Sketches</title>
        </Head>
        <Intro 
          title="Sketch."
          subtitle={
            <>
              A statically generated blog example using{' '}
              <a
                href="https://nextjs.org/"
                className="underline hover:text-success duration-200 transition-colors"
              >
                Next.js
              </a>{' '}
              and {CMS_NAME}.
            </>
          }/>
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

Index.propTypes = {
  sketches: PropTypes.array
};