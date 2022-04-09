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
        Hey there, my name is Phil, I am a full stack JS dev; I work on web UI (react), on servers/APIs (node), on apps (react native) and on 3D experiences (three.js) I have been working as a software engineer for over 7 years, with a high-end focus on eCommerce, accessibility, user experience, and scaling products.
        </p>
      </div>
      <GoatScene />
    </>
  );
}
