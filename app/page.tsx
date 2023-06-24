import DashboardContainer from "@/components/Dashboard/DashboardContainer";

export default async function Home() {
  const getList = async () => {
    const data = await fetch(
      "https://dull-puce-badger-tux.cyclic.app/content/get_titles"
    );
    return data;
  };
  const data = await getList();
  const items = await data.json();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <DashboardContainer contentList={items} />
    </main>
  );
}
