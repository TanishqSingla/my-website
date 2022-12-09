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
			<ul className="sm:space-y-8 space-y-4">
				{posts.map((post) => (
					<li key={post.date}>
						<h3 className="highlight font-bold">{post.title}</h3>{" "}
						<p className="text-xs">
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
