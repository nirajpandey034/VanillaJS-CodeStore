import SaveContentContainer from "@/components/SaveContent/SaveContentContainer";
export default async function PostContent() {
  let items = [];
  const getList = async () => {
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}content/get_titles`,
      {
        cache: "no-store",
      }
    );
    return data;
  };
  try {
    const data = await getList();
    items = await data.json();
  } catch (err) {
    return { error: "Please Try Again" };
  }
  return (
    <main className="min-h-screen">
      <SaveContentContainer contentList={items} />
    </main>
  );
}
