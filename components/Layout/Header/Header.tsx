import Link from "next/link";
import { useState } from "react";
import { BsSun, BsMoonFill } from "react-icons/bs";

export default function () {
	const [isDark, setIsDark] = useState(false);

	return (
		<header className="bg-gray-200/40 dark:bg-stone-700/40 dark:text-white sticky w-full px-4 py-4 top-4 self-start my-4 rounded-xl backdrop-blur-sm">
			<nav className="flex items-center">
				<ul className="flex gap-4 grow">
					<li>
						<Link href="/">Home</Link>
					</li>
					<li>
						<Link href="/projects">Projects</Link>
					</li>
					<li>
						<Link href="/blogs">Blog</Link>
					</li>
				</ul>
				<div className="theme-switcher">
					<button onClick={() => setIsDark(!isDark)}>
						{isDark ? (
							<BsSun size="24" color="black" />
						) : (
							<BsMoonFill color="white" />
						)}
					</button>
				</div>
			</nav>
		</header>
	);
}
