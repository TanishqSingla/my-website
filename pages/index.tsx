import Head from "next/head";

export default function Home() {
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
				<p className="indent-4">I am a fullstack developer and I like to love to make webapps</p>
			</div>
			<div className="social">
				<h3>Find me on</h3>
				<div className="social-links">
					<a href="https://www.github.com/TanishqSingla">
					</a>
				</div>
			</div>
		</>
	);
}
