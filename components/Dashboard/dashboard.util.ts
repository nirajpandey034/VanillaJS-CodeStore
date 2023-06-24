const getContentWithId = async (id: string) => {
  try {
    const response = await fetch(
      "https://dull-puce-badger-tux.cyclic.app/content/get_content_with_id",
      {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
        }),
      }
    );
    const { data } = await response.json();
    return data[0];
  } catch (err) {
    throw new Error("Please try again");
  }
};

export default getContentWithId;
