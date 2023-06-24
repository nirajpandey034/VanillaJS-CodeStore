import DashboardContainer from "@/components/Dashboard/DashboardContainer";

export default async function Home() {
  let items = [];
  const getList = async () => {
    const data = await fetch(
      "https://dull-puce-badger-tux.cyclic.app/content/get_titles"
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
    <main className="min-h-screen min-w-screen">
      <DashboardContainer contentList={items} />
    </main>
  );
}
