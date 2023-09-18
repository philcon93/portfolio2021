import Head from "next/head";
import { CMS_NAME } from "../utilities/constants";
import { Intro, PageWrapper } from "../components/site";
import { GoatExperience } from "../components/three/goat-scene";
import { InvisibleExperience } from "../components/three/invisible-scene";

export default function Home() {
  return (
    <>
      <Head>
        <title>{CMS_NAME}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <InvisibleExperience />
      <PageWrapper size={"sm"}>
        <Intro title="Goat Thoughts." />
        <p className="mb-5">
          Hey there, my name is Phil, a full-stack JS engineer; UIs (react),
          servers/APIs (node), apps (react native), and 3D experiences
          (three.js). I have been working as a software engineer for over 8
          years, in eCommerce, Brand Automation, and Financial Planning
          industries, with a high degree of focus on design systems,
          accessibility, user experience, and scaling products.
        </p>
        <GoatExperience />
      </PageWrapper>
    </>
  );
}
