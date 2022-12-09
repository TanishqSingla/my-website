import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from 'remark-html'

const postDirectory = path.join(process.cwd(), "posts");

export function getPostData() {
	const fileNames = fs.readdirSync(postDirectory);

	const posts = fileNames.map((fileName) => {
		const id = fileName.replace(/\.md$/, "");

		const fullPath = path.join(postDirectory, fileName);
		const fileContents = fs.readFileSync(fullPath, "utf-8");

		const matterResult = matter(fileContents);

		return {
			id,
			...(matterResult.data as { title: string; date: string }),
		};
	});

	return posts.sort((a, b) => (new Date(a.date) < new Date(b.date) ? 1 : -1));
}

export function getPostsIds() {
	const fileName = fs.readdirSync(postDirectory);

	return fileName.map((fileName) => {
		return {
			params: {
				id: fileName.replace(/\.md$/, ""),
			},
		};
	});
}

export async function getPostContent(id: string) {
	const fullPath = path.join(postDirectory, `${id}.md`);
	const fileContents = fs.readFileSync(fullPath, "utf-8");

	const matterResult = matter(fileContents);

	const processedContent = await remark()
		.use(html)
		.process(matterResult.content);

	const contentHTML = processedContent.toString();

	return {
		id,
		contentHTML,
		...matterResult.data
	}
}
