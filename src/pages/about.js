import Head from "next/head";
import { CMS_NAME } from "../utilities/constants";
import { AboutInfo, Intro, PageWrapper } from "../components/site";
import PropTypes from "prop-types";

export default function About({ jobs }) {
  return (
    <>
      <Head>
        <title>{CMS_NAME} | About</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageWrapper>
        <Intro title="About." />
        <h2 className="text-4xl">Experience</h2>
        <div className="py-2">
          Javascript | Typescript | React | Redux | Recoil | MicroFrontends | Nx
          | Lerna | Prisma | Postgres | Mongo | Express | Apollo Server | NestJS
          | Node | RESTful | GraphQL | tRPC | React Native | Expo | NextJS |
          Serverless | Webpack | Rollup | Jest | Cypress | jQuery | D3 | threejs
          | react-three-fiber | HTML | A11y | PWA | CSS | SASS | LESS | CSS
          Modules | CSS in JS | Gulp | Buildkite | Git | GitHub actions
        </div>

        {jobs.map((job, i) => (
          <AboutInfo
            key={i}
            title={job.title}
            subtitle={job.subtitle}
            timeframe={job.timeframe}
          />
        ))}

        <h2 className="text-4xl my-3">Education</h2>
        <AboutInfo
          title="Bachelor of Games and Interactive Entertainment, Game Design"
          subtitle="Queensland University of Technology"
          timeframe="2012 - 2014"
        >
          <div>Game Design - Animation</div>
          <p>GPA: 5.4</p>
        </AboutInfo>
        <AboutInfo
          title="Secondary Education"
          subtitle="St Peters Lutheran College"
          timeframe="2000 - 2011"
        >
          <p>Overall Position (OP) : 7</p>
        </AboutInfo>
      </PageWrapper>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: { jobs: jobsData },
  };
}

const jobsData = [
  {
    title: "Software Development Engineer",
    subtitle: "Workday",
    timeframe: "Jan 2022 - Present",
  },
  {
    title: "Senior UX Engineer",
    subtitle: "Outfit",
    timeframe: "Aug 2021 - Jan 2022",
  },
  {
    title: "UX Engineer",
    subtitle: "Maropost",
    timeframe: "Jan 2021 - Aug 2021",
  },
  {
    title: "UX Engineer",
    subtitle: "Neto E-Commerce Solutions",
    timeframe: "Jul 2018 - Jul 2021",
  },
  {
    title: "Frontend Web Developer",
    subtitle: "Neto E-Commerce Solutions",
    timeframe: "Jul 2015 – Jul 2018",
  },
  {
    title: "Junior Web Developer",
    subtitle: "ABSC International",
    timeframe: "Feb 2015 – Jul 2015",
  },
  {
    title: "Web Design Internship",
    subtitle: "MyWork",
    timeframe: "Nov 2014 – Dec 2014",
  },
];

About.propTypes = {
  jobs: PropTypes.array,
};
