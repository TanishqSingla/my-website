import fs from "fs";
import path from "path";
import matter from "gray-matter";

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
			...(matterResult.data as { title: string; date: Date }),
		};
	});

	return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}
