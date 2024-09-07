import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsSun, BsMoonFill } from "react-icons/bs";

export default function Header() {
	const [isDark, setIsDark] = useState(false);
	const router = useRouter();

	useEffect(() => {
		const wasDarkMode = document.documentElement.classList.contains('dark');

		setIsDark(wasDarkMode);
		document.documentElement.classList.toggle("dark", wasDarkMode);
	}, []);

	const handleThemeSwitch = () => {
		setIsDark(!isDark);
		document.documentElement.classList.toggle("dark", !isDark);
	};

	return (
		<header className="bg-gray-200/40 dark:bg-stone-700/40 dark:text-white sticky w-full p-4 top-4 self-start my-4 rounded-xl backdrop-blur-sm">
			<nav className="flex items-center">
				<ul className="flex gap-4 grow">
					<li className={`nav-link ${router.pathname === "/" ? "active" : ""}`}>
						<Link href="/">Home</Link>
					</li>
					{/* <li>
						<Link href="/projects">Projects</Link>
					</li> */}
					<li
						className={`nav-link ${
							router.pathname === "/blog" ? "active" : ""
						}`}
					>
						<Link href="/blog">Blog</Link>
					</li>
				</ul>
				<div className="theme-switcher">
					<button onClick={handleThemeSwitch} aria-label="Theme Switcher">
						{isDark ? <BsSun color="black" /> : <BsMoonFill color="white" />}
					</button>
				</div>
			</nav>
		</header>
	);
}
