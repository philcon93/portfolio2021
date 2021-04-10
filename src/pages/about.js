import Head from 'next/head';
import { CMS_NAME } from '../utilities/constants';
import { AboutInfo, Intro } from '../components/site';

export default function Home() {
  return (
    <>
      <Head>
        <title>{CMS_NAME} | About</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Intro title="About." />
      <div className="w-100">
        <h2 className="text-4xl">Experience</h2>
        <AboutInfo
            title="UX Engineer"
            subtitle="Neto E-Commerce Solutions"
            timeframe="Jul 2018 - Present">
            <div>
                <p className="mb-2">I work within a cross-functional product development team to bring together the design (user interface, accessibility and user experience) and engineering (front-end development) functions of the business. Ultimately I am to utilise my design and development toolkit to solve problems for our customers and help the teams I belong to achieve their goals, especially pertaining to user experience and interface.</p>
                <span>Some of my responsibilities as a UX engineer include:</span>
                <ul className="list-disc pl-5">
                    <li>Wireframe, design, prototype and implement user interfaces using the standardised toolkit of the technology team.</li>
                    <li>Participate in research to gather insights on best practices. This includes reading books and internet resources, conducting behavioural testing and various other types of customer engagement.</li>
                    <li>Advise peers on decisions impacting user experience.</li>
                    <li>Participate in, and run, design workshops.</li>
                    <li>Participate in the rituals outlined by the working agreements within your cross-functional team and your Community of Practice
                    i.e., sprint planning, showcase and stand up.</li>
                    <li>Within your scrum team and community of practice, respect and work towards the priorities which have been agreed upon. Avoid implementing work without consulting the relevant teams.</li>
                    <li>Champion good usability and front-end practices. Represent the user, our customer, and act in their best interests.</li>
                </ul>
            </div>
        </AboutInfo>
        <AboutInfo
            title="Frontend Web Developer"
            subtitle="Neto E-Commerce Solutions"
            timeframe="Jul 2015 – Jul 2018">
            <div>
                <p>As a Frontend Web Developer my main responsibility was to provide excellence client services. The work ranged from doing small design tweaks to customers ecommerce sites, to full scale design projects. These design projects would start with in-depth client research, scope outlining and ultimately creating a project that best serves the customers business.</p>
                <p>I would also work heavily on internal design work, which would rapidly change from week to week, so I had to be comfortable with rapidly different work and excel at it.</p>
                <span>Some of the internal design work entailed:</span>
                <ul className="list-disc pl-5">
                    <li>Maintaining the development themes, services forms, sysdocs,</li>
                    <li>Scoping out potential projects value, required resources, timelines and validity,</li>
                    <li>Research and introducing new technnology stacks</li>
                </ul>
            </div>
        </AboutInfo>
        <AboutInfo
            title="Junior Web Developer"
            subtitle="ABSC International"
            timeframe="Feb 2015 – Jul 2015">
            <div>
                I predominately work on creating new websites for clients, from design to full development and completion of the website.
                I seamlessly work with frontend and backend tools and languages. The role also requires me to produce visually effective, informative, innovative and interactive e-learning content.
            </div>
        </AboutInfo>
        <AboutInfo
            title="Web Design Internship"
            subtitle="MyWork"
            timeframe="Nov 2014 – Dec 2014">
            <div>As an intern at MyWork, my role shifted on a day to day schedule. Some of the work involved;
                <ul className="list-disc pl-5">
                    <li>Learning how to make design and development changes to existing websites via MyWork&apos;s CMS.</li>
                    <li>Design websites and ecommerce sites for businesses of all sizes across any industry.</li>
                    <li>Get hands on with developing in ecommerce platforms like OpenCart.</li>
                    <li>Observe and be involved in responsive website design projects.</li>
                </ul>
            </div>
        </AboutInfo>
        <h2 className="text-4xl my-3">Education</h2>
        <AboutInfo
            title="Bachelor of Games and Interactive Entertainment, Game Design"
            subtitle="Queensland University of Technology"
            timeframe="2012 - 2014">
            <div>Game Design - Animation</div>
            <p>GPA: 5.4</p>
        </AboutInfo>
        <AboutInfo
            title="Secondary Education"
            subtitle="St Peters Lutheran College"
            timeframe="2000 - 2011">
            <p>Overall Position (OP) : 7</p>
        </AboutInfo>
      </div>
    </>
  );
}
