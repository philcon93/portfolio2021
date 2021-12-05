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
      <div className="w-full">
        <h2 className="text-4xl">Experience</h2>
        <AboutInfo
            title="Senior UX Engineer"
            subtitle="Outfit"
            timeframe="Aug 2021 - Present" >
            <div>
                <p>Some of the responsibilities of my role include:</p>
                <ul className="list-disc pl-5">
                    <li>Create and manage front-end components, using the internal design system (Outkit).</li>
                    <li>Contribute to front-end systems and front-end standards.</li>
                    <li>Plan and manage UX and front-end work in the context of a cross-functional team.</li>
                    <li>Translate design patterns into highly refined and usable components.</li>
                    <li>Collaborating with design, product, and tech stakeholders to form and plan out scopes of work for various projects and applications.</li>
                    <li>Produce and champion cleaner, more scalable, and more stable code.</li>
                    <li>Increase the front-end testing coverage.</li>
                    <li>Plan and run workshops to upskill the entire Engineering Team (introduce new concepts and paradigms to the team to increase development cadence and code quality).</li>
                    <li>Be a strong presence in PR code reviews, especially with respect to React and Javascript contributions.</li>
                </ul>
                <p className="my-2">2021 - Make It Happen Award of the Year</p>
                <p>2021 - Be Bold Award of the Year</p>
            </div>
        </AboutInfo>
        <AboutInfo
            title="UX Engineer"
            subtitle="Maropost"
            timeframe="Jan 2021 - Aug 2021" />
        <AboutInfo
            title="UX Engineer"
            subtitle="Neto E-Commerce Solutions"
            timeframe="Jul 2018 - Jul 2021">
            <div>
                <p className="mb-2">I worked within a cross-functional product development team to bring together the design (user interface, accessibility, and user experience) and engineering (front-end development) functions of the business. Ultimately I am to utilize my design and development toolkit to solve problems for our customers and help the teams I belong to achieve their goals, especially pertaining to user experience and interface.</p>
                <p className="mb-2">Some of the major projects I worked on throughout my time as a UX Engineer has been; Redevelop and redesign our Managed Checkout, Implement multiple payment methods into the managed checkout, including Stripe, eWay, and Web payments such as ApplePay and GooglePay. Helped modernize the Sales Order experience, and round out the Inventory management offering by designing and developing Stock Transfers into the product.</p>
                <span>Some of my responsibilities as a UX engineer include:</span>
                <ul className="list-disc pl-5">
                    <li>Wireframe, design, prototype and implement user interfaces using the standardized toolkit of the technology team.</li>
                    <li>Update and maintain our products style guide.</li>
                    <li>Participate in research to gather insights on best practices. This includes reading books and internet resources, conducting behavioral testing, and various other types of customer engagement.</li>
                    <li>Advise peers on decisions impacting user experience.</li>
                    <li>Participate in, and run, design workshops.</li>
                    <li>Participate in the rituals outlined by the working agreements within our cross-functional team and our Community of Practice i.e., sprint planning, showcase, and stand up.</li>
                    <li>Champion good usability and front-end practices. Represent the user, our customer, and act in their best interests.</li>
                </ul>
            </div>
        </AboutInfo>
        <AboutInfo
            title="Frontend Web Developer"
            subtitle="Neto E-Commerce Solutions"
            timeframe="Jul 2015 – Jul 2018">
            <div>
                <p>As a Frontend Web Developer my main responsibility was to provide excellent client services. The work ranged from doing small design tweaks to customers eCommerce sites, to full-scale design projects. These design projects would start with in-depth client research, scope outlining, and ultimately creating a project that best serves the customers business.</p>
                <p>I would also work heavily on internal design work, which would rapidly change from week to week, so I had to be comfortable with rapidly different work and excel at it.</p>
                <span>Some of the internal design work entailed:</span>
                <ul className="list-disc pl-5">
                    <li>Maintaining the development themes, services forms, Sysdocs,</li>
                    <li>Scoping out potential projects value, required resources, timelines, and validity,</li>
                    <li>Research and introducing new technology stacks</li>
                </ul>
                <p className="mt-2">2015 - Most Improved Designer Award of the Year</p>
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
