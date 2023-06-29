import axios from "axios";
const searchTitle = async (str: string) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}content/search_item`,
      {
        title: str,
      }
    );
    return response;
  } catch (err) {
    console.log(err);
  }
};
export default searchTitle;
