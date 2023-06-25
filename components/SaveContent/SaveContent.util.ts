import Content from "../../interfaces/Content";
import { getCookie } from "typescript-cookie";
const SaveContent = async (data: Content) => {
  try {
    const response = await fetch(
      "https://dull-puce-badger-tux.cyclic.app/content/post_content",

      {
        cache: "no-store",
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
          token: getCookie("token"),
        }),
      }
    );
    const res = await response.json();
    // alert("Content Uploaded Successfully");
    return response.status;
  } catch (err) {
    console.log(err);
  }
};

export default SaveContent;
