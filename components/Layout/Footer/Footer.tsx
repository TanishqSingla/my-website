export default function Footer() {
	return (
		<footer className="grid grid-cols-12 gap-8 p-4 text-defaults">
			<div className="col-span-6">
				<h4 className="text-lg">
					<strong>Socials</strong>
				</h4>
				<ul className="text-sm underline indent-1 flex flex-col md:flex-row gap-2">
					<li>
						<a href="https://github.com/TanishqSingla">Github</a>
					</li>
					<li>
						<a href="https://linkedin.com/in/tanishqsingla">LinkedIn</a>
					</li>
					<li>
						<a href="https://peerlist.io/tanishqsingla">Peerlist</a>
					</li>
					<li>
						<a href="https://x.com/TanishqSingla_">Twitter / X</a>
					</li>
				</ul>
			</div>
			<div className="col-span-6">
				<h4 className="text-lg">
					<strong>Downloads</strong>
				</h4>
				<ul className="text-sm underline indent-1">
					<li>
						<a href="/resume.pdf">Resume</a>
					</li>
				</ul>
			</div>
		</footer>
	);
}
