import fs from "fs";
import path from "path";
import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";
import { spawnSync } from "child_process";

const postDirectory = path.join(process.cwd(), "posts");

type PostsMeta = {
  id: string;
  title: string;
  date: string;
};

export function getMetaData(filePath: string) {
  const cmdPath = path.join(process.cwd(), "scripts/getMetaData");

  const child = spawnSync(cmdPath, [filePath], { encoding: "utf-8" });

  return JSON.parse(child.stdout.toString());
}

function readFile(filePath: string) {
  const cmdPath = path.join(process.cwd(), "scripts/readFile");

  const child = spawnSync(cmdPath, [filePath], { encoding: "utf-8" });
  return child.stdout.toString();
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

export async function getPostContent(id: string) {
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
  const fileContents = readFile(fullPath);

  const markedHTML = marked.parse(fileContents);
  const metaData = getMetaData(fullPath);

  return {
    id,
    markedHTML,
    ...metaData,
  };
}
