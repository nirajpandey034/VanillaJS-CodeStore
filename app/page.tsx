import DashboardContainer from "@/components/Dashboard/DashboardContainer";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "VanillaJS-CodeStore | Home",
  description: "VanillaJS-CodeStore | Code Dashboard",
};

export default async function Home() {
  let items = [];
  let jokes = [];
  const getList = async () => {
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}content/get_titles`,
      {
        cache: "no-store",
      }
    );
    return data;
  };
  const getJokes = async () => {
    const data = await fetch(`${process.env.NEXT_PUBLIC_JOKE_API}`, {
      headers: {
        "X-Api-Key": `${process.env.NEXT_PUBLIC_JOKE_API_KEY}`,
      },
      cache: "no-store",
    });
    return data;
  };
  try {
    const data = await getList();
    items = await data.json();
    const joke = await getJokes();
    jokes = await joke.json();
  } catch (err) {
    return { error: "Please Try Again" };
  }

  return (
    <main className="min-w-screen">
      <DashboardContainer contentList={items} jokes={jokes} />
    </main>
  );
}
