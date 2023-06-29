import DashboardContainer from "@/components/Dashboard/DashboardContainer";

export default async function Home() {
  let items = [];
  let jokes = [];
  const getList = async () => {
    const data = await fetch(
      "https://dull-puce-badger-tux.cyclic.app/content/get_titles",
      {
        cache: "no-store",
      }
    );
    return data;
  };
  const getJokes = async () => {
    const data = await fetch("https://api.api-ninjas.com/v1/jokes?limit=3", {
      headers: {
        "X-Api-Key": "xo8IrW7gQ02g8u6ARHDW8w==u9qaebBrqUBhdx3r",
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
