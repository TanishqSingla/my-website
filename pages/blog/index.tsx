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
		<main>
			<ul>
				{posts.map((post) => (
					<li key={post.date}>
						<Link href={`/blog/posts/${post.id}`}><h2 className="highlight font-bold mb-2">{post.title}</h2></Link>
						<p className="text-xs opacity-60">
							{new Date(post.date).toUTCString().substring(0, 16)}
						</p>
					</li>
				))}
			</ul>
		</main>
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
