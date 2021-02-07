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
          title="Sketch book."
          subtitle={
            <>
              A{' '}
              <a
                href="https://processing.org/"
                className="underline hover:text-success duration-200 transition-colors"
              >Processing</a> term, it gives a means to &apos;sketch&apos; ideas in code.
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