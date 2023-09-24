import { GetStaticPaths, GetStaticProps } from "next";
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
    <main className="max-w-3xl mx-auto">
      <h1 className="mb-2 highlight">{props.postData.title}</h1>
      <p className="text-xs opacity-60 sm:mb-12 mb-8">
        {new Date(props.postData.date).toUTCString().substring(0, 16)}
      </p>
      <div
        className="post-content"
        dangerouslySetInnerHTML={{ __html: props.postData.markedHTML }}
      />
    </main>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const postData = await getPostContent(params.id);

  return {
    props: {
      postData,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getPostsIds();
  return {
    paths,
    fallback: false,
  };
};
