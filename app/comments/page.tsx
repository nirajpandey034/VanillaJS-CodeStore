import CommentBoardContainer from "@/components/CommentBoard/CommentBoardContainer";
export default async function PostContent() {
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
