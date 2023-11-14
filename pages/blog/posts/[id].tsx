import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { GrLinkedin } from "react-icons/gr";
import { getPostContent, getPostsIds } from "../../../lib/posts";

type PostProps = {
	postData: {
		title: string;
		date: string;
		markedHTML: string;
	};
};

export default function Post(props: PostProps) {
	return (
		<div className="max-w-3xl mx-auto">
			<main>
				<h1 className="mb-2 highlight">{props.postData.title}</h1>
				<p className="text-xs opacity-60 sm:mb-12 mb-8">
					{new Date(props.postData.date).toUTCString().substring(0, 16)}
				</p>
				<div
					className="post-content"
					dangerouslySetInnerHTML={{ __html: props.postData.markedHTML }}
				/>
			</main>
			<hr className="mt-12 opacity-40 px-4 dark:border-gray-200/40 border-stone-700 rounded-lg" />
			<footer className="p-4">
				Connect with me @{" "}
				<a href="https://peerlist.io/tanishqsingla">
					<Image
						src={"/peerlist.svg"}
						alt="peerlist logo"
						width={18}
						height={18}
						className="inline"
					/>
				</a>
				<a href="https://linkedin.com/in/tanishqsingla">
				<GrLinkedin size="18" color="#0a66c2" className="inline ml-2" />
				</a>
			</footer>
		</div>
	);
}

export const getStaticProps: GetStaticProps = ({ params }: any) => {
	const postData = getPostContent(params.id);

	return {
		props: {
			postData,
		},
	};
};

export const getStaticPaths: GetStaticPaths = () => {
	const paths = getPostsIds();
	return {
		paths,
		fallback: false,
	};
};
