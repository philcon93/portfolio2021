import Head from 'next/head';
import { CMS_NAME } from '../utilities/constants';
import { Intro } from '../components';

export default function Home() {
  return (
    <>
      <Head>
        <title>{CMS_NAME} | About</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Intro title="About." />
      <div className="w-100">
        <section className="resume-section p-3 p-lg-5 d-flex justify-content-center" id="experience">
        <div className="w-100">
            <h2 className="mb-5">Experience</h2>
            <div className="resume-item d-flex flex-column flex-md-row justify-content-between mb-5">
            <div className="resume-content">
                <h3 className="mb-0">UX Engineer</h3>
                <div className="subheading mb-3">Neto E-Commerce Solutions</div>
                <p>I work within a cross-functional product development team to bring together the design (user interface, accessibility and user experience) and engineering (front-end development) functions of the business. Ultimately I am to utilise my design and development toolkit to solve problems for our customers and help the teams I belong to achieve their goals, especially pertaining to user experience and interface.</p>
                <p>Some of my responsibilities as a UX engineer include:
                <ul>
                <li>Wireframe, design, prototype and implement user interfaces using the standardised toolkit of the technology team.</li>
                <li>Participate in research to gather insights on best practices. This includes reading books and internet resources, conducting behavioural testing and various other types of customer engagement.</li>
                <li>Advise peers on decisions impacting user experience.</li>
                <li>Participate in, and run, design workshops.</li>
                <li>Participate in the rituals outlined by the working agreements within your cross-functional team and your Community of Practice
                i.e., sprint planning, showcase and stand up.</li>
                <li>Within your scrum team and community of practice, respect and work towards the priorities which have been agreed upon. Avoid implementing work without consulting the relevant teams.</li>
                <li>Champion good usability and front-end practices. Represent the user, our customer, and act in their best interests.</li>
                </ul></p>
            </div>
            <div className="resume-date text-md-right">
                <span className="text-primary">July 2018 - Present</span>
            </div>
            </div>
            <div className="resume-item d-flex flex-column flex-md-row justify-content-between mb-5">
            <div className="resume-content">
                <h3 className="mb-0">Frontend Web Developer</h3>
                <div className="subheading mb-3">Neto E-Commerce Solutions</div>
                <p>As a Frontend Web Developer my main responsibility was to provide excellence client services. The work ranged from doing small design tweaks to customers ecommerce sites, to full scale design projects. These design projects would start with in-depth client research, scope outlining and ultimately creating a project that best serves the customers business.</p>
                <p>I would also work heavily on internal design work, which would rapidly change from week to week, so I had to be comfortable with rapidly different work and excel at it.</p>
                <p>Some of the internal design work entailed:
                <ul>
                    <li>Maintaining the development themes, services forms, sysdocs,</li>
                    <li>Scoping out potential projects value, required resources, timelines and validity,</li>
                    <li>Research and introducing new technnology stacks</li>
                </ul>
                </p>
            </div>
            <div className="resume-date text-md-right">
                <span className="text-primary">July 2015 – July 2018</span>
            </div>
            </div>
            <div className="resume-item d-flex flex-column flex-md-row justify-content-between">
            <div className="resume-content">
                <h3 className="mb-0">Junior Web Developer</h3>
                <div className="subheading mb-3">ABSC International</div>
                <p>I predominately work on creating new websites for clients, from design to full development and completion of the website. I seamlessly work with frontend and backend tools and languages. The role also requires me to produce visually effective, informative, innovative and interactive e-learning content.</p>
            </div>
            <div className="resume-date text-md-right">
                <span className="text-primary">February 2015 – July 2015</span>
            </div>
            </div>
            <div className="resume-item d-flex flex-column flex-md-row justify-content-between">
            <div className="resume-content">
                <h3 className="mb-0">Web Design Internship</h3>
                <div className="subheading mb-3">MyWork</div>
                <p>As an intern at MyWork, my role shifted on a day to day schedule. Some of the work involved;
                <ul><li>Learning how to make design and development changes to existing websites via MyWork&apos;s CMS.</li>
                <li>Design websites and ecommerce sites for businesses of all sizes across any industry.</li>
                <li>Get hands on with developing in ecommerce platforms like OpenCart.</li>
                <li>Observe and be involved in responsive website design projects.</li>
                </ul></p>
            </div>
            <div className="resume-date text-md-right">
                <span className="text-primary">November 2014 – December 2014</span>
            </div>
            </div>
        </div>
        </section>
        <hr className="m-0" />
        <section className="resume-section p-3 p-lg-5 d-flex align-items-center" id="education">
        <div className="w-100">
            <h2 className="mb-5">Education</h2>
            <div className="resume-item d-flex flex-column flex-md-row justify-content-between mb-5">
            <div className="resume-content">
                <h3 className="mb-0">Queensland University of Technology</h3>
                <div className="subheading mb-3">Bachelor of Games and Interactive Entertainment, Game Design</div>
                <div>Game Design - Animation</div>
                <p>GPA: 5.4</p>
            </div>
            <div className="resume-date text-md-right">
                <span className="text-primary">2012 - 2014</span>
            </div>
            </div>
            <div className="resume-item d-flex flex-column flex-md-row justify-content-between">
            <div className="resume-content">
                <h3 className="mb-0">St Peters Lutheran College</h3>
                <p>Overall Position (OP) : 7</p>
            </div>
            <div className="resume-date text-md-right">
                <span className="text-primary">2000 - 2011</span>
            </div>
            </div>
        </div>
        </section>
      </div>
    </>
  );
}
