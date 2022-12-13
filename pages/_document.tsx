import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html>
			<Head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="true"
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Poppins&display=swap"
					rel="stylesheet"
				/>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<meta name="author" content="Tanishq Singla" />
				<meta name="keywords" content="Tanishq,Singla,developer" />
				<meta property="og:image" content="/pfp.webp"/>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
