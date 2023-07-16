import SaveContentContainer from "@/components/SaveContent/SaveContentContainer";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "VanillaJS-CodeStore | Post-Content",
  description: "VanillaJS-CodeStore | Add/Update/Delete Content",
};
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
