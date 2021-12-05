import Head from 'next/head';
import { CMS_NAME } from '../utilities/constants';
import { Intro } from '../components/site';
import GoatScene from '../components/three/goat-scene';

export default function Home() {
  return (
    <>
      <Head>
        <title>{CMS_NAME}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Intro title="Goat Thoughts." />
      <div className="w-full">
        <p className="lead mb-5">
          Hey there, my name is Phil! I have been working as a software engineer for over 7 years, with a high-end focus on eCommerce, user experience, and scaling products.
        </p>
        <p>
          I love developing web applications, visualizations, and understanding user behaviour!
        </p>
      </div>
      <GoatScene />
    </>
  );
}
