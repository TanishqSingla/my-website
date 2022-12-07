import Head from "next/head";
import { GrGithub, GrTwitter, GrLinkedin } from "react-icons/gr";
import { IoMdDownload } from "react-icons/io";

export default function Home() {
	const socials = [
		{
			name: "Github",
			link: "https://www.github.com/TanishqSingla",
			logo: <GrGithub size="24" color="#344e41" />,
		},
		{
			name: "Twitter",
			link: "https://www.twitter.com/TanishqSingla_",
			logo: <GrTwitter size="24" color="#344e41" />,
		},
		{
			name: "LinkedIn",
			link: "https://www.linkedin.com/in/tanishqsingla",
			logo: <GrLinkedin size="24" color="#344e41" />,
		},
	];
	return (
		<>
			<Head>
				<title>Tanishq Singla</title>
				<meta name="description" content="Tanishq Singla's website" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div>
				<h1>
					<span className="highligh">Hello</span> there.
				</h1>
				<h1>
					Welcome to <span className="highlight">Tanishq</span>
				</h1>
			</div>
			<div className="about-me py-2">
				<h3>About me</h3>
				<p className="indent-4">
					I am a fullstack developer and I like to love to make webapps
				</p>
			</div>
			<div className="social">
				<h3>Find me on</h3>
				<div className="social-links">
					{socials.map((social) => (
						<a href={social.link} key={social.name}>
							{social.logo}
							{social.name}
						</a>
					))}
				</div>
			</div>
			<div>
				<h3>Dowload resume</h3>
				<div className="social-links">
					<a href="" download className="px-4">
						<IoMdDownload color="#344e41" size="24" />
						Resume
					</a>
				</div>
			</div>
		</>
	);
}
