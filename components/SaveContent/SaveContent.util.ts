import Content from "../../interfaces/Content";
import { getCookie } from "typescript-cookie";
const SaveContent = async (data: Content) => {
  console.log(data);
  const response = await fetch(
    "https://dull-puce-badger-tux.cyclic.app/content/post-content",
    {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": getCookie("token") || "",
      },
      body: JSON.stringify({
        title: data.title,
        description: data.description,
        htmlsnippet: data.htmlsnippet,
        csssnippet: data.csssnippet,
        jssnippet: data.jssnippet,
      }),
    }
  );
  console.log(await response.json());
};

export default SaveContent;
