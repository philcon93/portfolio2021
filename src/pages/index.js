import Head from 'next/head';
import { CMS_NAME } from '../utilities/constants';
import { Intro } from '../components';

export default function Home() {
  return (
    <>
      <Head>
        <title>{CMS_NAME}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Intro title="Goat Thoughts." />
      <div className="w-100">
        <p className="lead mb-5">
          Hey there, my name is Phil! I have been working as a front end web developer for over 6 years, with a high end focus of ecommerce, user experience and accessibility.
        </p>
        <p>
          I love developing web applications, visualizing data, and understanding user behaviour!
        </p>
      </div>
    </>
  );
}
