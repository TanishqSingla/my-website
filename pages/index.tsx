import Head from "next/head";
import Image from "next/image";
import { GrGithub, GrTwitter, GrLinkedin } from "react-icons/gr";
import { IoMdDownload } from "react-icons/io";

const socials = [
  {
    name: "Github",
    link: "https://www.github.com/TanishqSingla",
    logo: <GrGithub size="24" />,
  },
  {
    name: "Twitter",
    link: "https://www.twitter.com/TanishqSingla_",
    logo: <GrTwitter size="24" />,
  },
  {
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/tanishqsingla",
    logo: <GrLinkedin size="24" />,
  },
];

export default function Home() {
  return (
    <>
      <Head>
        <title>Tanishq Singla</title>
        <meta
          name="description"
          content="Hey there, I am Tanishq. I am a fullstack developer and I love to develop web-applicaitons. Welcome to my website"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="sm:space-y-8 space-y-4">
        <div className="flex justify-between">
          <div className="sm:space-y-8 space-y-4">
            <h1>
              <span className="highlight">Hello</span> there.
            </h1>
            <h1>
              Welcome to <span className="highlight">my website.</span>
            </h1>
            <h1>
              I am <span className="highlight">Tanishq</span>
            </h1>
          </div>
          <figure className="rounded-full overflow-hidden w-60 aspect-square">
            <Image
              alt="Tanishq's pfp"
              src="/pfp.webp"
              width={60 * 16}
              height={60 * 16}
              className="h-full w-full object-cover"
            />
          </figure>
        </div>
        <div className="about-me py-2">
          <h3>About me</h3>
          <p className="indent-4">
            I am a fullstack developer and I love to develop web-applicaitons.
          </p>
        </div>
        <div className="social">
          <h3>Find me on</h3>
          <div className="social-links">
            {socials.map((social) => (
              <a
                href={social.link}
                key={social.name}
                className="dark:text-accent dark:font-bold text-primary-200"
              >
                {social.logo}
                {social.name}
              </a>
            ))}
          </div>
        </div>
        <div>
          <h3>Download my resume</h3>
          <div className="social-links">
            <a
              href="/resume.pdf"
              target="_blank"
              referrerPolicy="no-referrer"
              className="px-4 dark:text-accent dark:font-bold text-primary-200"
            >
              <IoMdDownload size="24" />
              Resume
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
