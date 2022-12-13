import Head from "next/head";
import Link from "next/link";
import { getPostData } from "../../lib/posts";

type BlogProps = {
	posts: [
		{
			id: string;
			title: string;
			date: string;
		}
	];
};

export default function Blog({ posts }: BlogProps) {
	return (
		<>
		<Head>
			<title>Blog | Tanishq Singla</title>
			<meta name="description" content="Tanishq Singla's Blog" />
		</Head>
		<main>
			<ul className="space-y-8">
				{posts.map((post) => (
					<li key={post.date}>
						<Link href={`/blog/posts/${post.id}`}><h2 className="highlight text-[32px] font-bold sm:mb-0 mb-2">{post.title}</h2></Link>
						<p className="text-xs opacity-60 text-right">
							{new Date(post.date).toUTCString().substring(0, 16)}
						</p>
					</li>
				))}
			</ul>
		</main>
</>
	);
}

export async function getStaticProps() {
	const posts = getPostData();
	return {
		props: {
			posts,
		},
	};
}
