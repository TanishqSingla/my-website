import fs from "fs";
import path from "path";
import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";
import ffi from "ffi-napi";

const postDirectory = path.join(process.cwd(), "posts");

type PostsMeta = {
	id: string;
	title: string;
	date: string;
};

function toCStringBuffer(str: string) {
	str += "\0";
	return Buffer.from(str);
}

const libPath = path.join(process.cwd(), "libget_metadata.so");
const libReadFilePath = path.join(process.cwd(), "libreadfile.so");

const lib = ffi.Library(libPath, {
	get_metadata: ["string", ["string"]],
});

const libRead = ffi.Library(libReadFilePath, {
	readfile: ["string", ["string"]],
});

export function getMetaData(filePath: string) {
	try {
		//@ts-ignore
		let metaDataJSON = lib.get_metadata(toCStringBuffer(filePath));
		return JSON.parse(String(metaDataJSON));
	} catch (err) {
		console.log("Failed at getMetaData(): ", err);
		return {};
	}
}

export function getPostData() {
	const fileNames = fs.readdirSync(postDirectory);

	const posts = [] as PostsMeta[];
	fileNames.forEach((fileName) => {
		const id = fileName.replace(/\.md$/, "");

		const fullPath = path.join(postDirectory, fileName);

		let metadata: Pick<PostsMeta, "title" | "date"> = getMetaData(fullPath);

		if (!metadata) return;
		posts.push({
			id,
			...metadata,
		});
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

export function getPostContent(id: string) {
	const marked = new Marked(
		markedHighlight({
			langPrefix: "language-",
			highlight(code, lang) {
				const language = hljs.getLanguage(lang) ? lang : "plaintext";
				return hljs.highlight(code, { language }).value;
			},
		}),
	);

	const fullPath = path.join(postDirectory, `${id}.md`);
	//@ts-ignore
	const fileContents = libRead.readfile(toCStringBuffer(fullPath));

	const markedHTML = marked.parse(fileContents || "");
	const metaData = getMetaData(fullPath);

	return {
		id,
		markedHTML,
		...metaData,
	};
}
