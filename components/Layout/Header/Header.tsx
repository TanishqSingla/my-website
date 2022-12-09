import Link from "next/link";
import { useEffect, useState } from "react";
import { BsSun, BsMoonFill } from "react-icons/bs";

export default function Header() {
	const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const wasDarkMode = localStorage.getItem('darkMode');

    if(wasDarkMode === "true") {
      setIsDark(true);
      document.body.classList.add('dark');
    }
  }, []);

  const handleThemeSwitch = () => {
    setIsDark(!isDark);
    localStorage.setItem("darkMode", String(!isDark));
    document.body.classList.toggle("dark");
  }

	return (
		<header className="bg-gray-200/40 dark:bg-stone-700/40 dark:text-white sticky w-full px-4 py-4 top-4 self-start my-4 rounded-xl backdrop-blur-sm">
			<nav className="flex items-center">
				<ul className="flex gap-4 grow">
					<li>
						<Link href="/">Home</Link>
					</li>
					{/* <li>
						<Link href="/projects">Projects</Link>
					</li> */}
					<li>
						<Link href="/blog">Blog</Link>
					</li>
				</ul>
				<div className="theme-switcher">
					<button onClick={handleThemeSwitch}>
						{isDark ? (
							<BsSun color="black" />
						) : (
							<BsMoonFill color="white" />
						)}
					</button>
				</div>
			</nav>
		</header>
	);
}
