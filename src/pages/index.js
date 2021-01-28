import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-100">
        <h1 className="mb-0">
          Phil
          <span className="text-primary">Connah</span>
        </h1>
        <div className="subheading mb-5">
          Professional Space Monkey · Australia ·
          <a href="mailto:philip.connah93@gmail.com">philip.connah93@gmail.com</a>
        </div>
        <p className="lead mb-5">
          Hey there, my name is Phil! I have been working as a front end web developer for over 5 years, with a high end focus of ecommerce, user experience and accessibility. I love designing, developing web applications, and understanding user behaviour!
        </p>
        <div className="social-icons">
          <a href="https://www.linkedin.com/in/philconnah/" target="_blank"rel="noreferrer" ><i className="fab fa-linkedin-in" /></a>
          <a href="https://github.com/philcon93" target="_blank"rel="noreferrer" ><i className="fab fa-github" /></a>
          <a href="https://www.instagram.com/phillycheese93" target="_blank" rel="noreferrer"><i className="fab fa-instagram" /></a>
        </div>
      </div>
    </>
  );
}
