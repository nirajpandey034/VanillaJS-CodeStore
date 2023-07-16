import CommentBoardContainer from "@/components/CommentBoard/CommentBoardContainer";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "VanillaJS-CodeStore | Comment",
  description: "VanillaJS-CodeStore | Comments",
};
export default async function Comment() {
  let comments = [];
  const getComments = async () => {
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}comment/get_comments`,
      {
        cache: "no-store",
        method: "get",
      }
    );
    return data;
  };
  try {
    const data = await getComments();
    comments = await data.json();
  } catch (err) {
    return { error: "Please Try Again" };
  }
  return (
    <main className="min-h-screen">
      <CommentBoardContainer commentList={comments} />
    </main>
  );
}
