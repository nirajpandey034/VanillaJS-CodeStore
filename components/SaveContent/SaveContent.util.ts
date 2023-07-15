import Content from "../../interfaces/Content";
import { getCookie } from "typescript-cookie";
const SaveContent = async (data: Content) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}content/post_content`,

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
          liveurl: data.liveurl,
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

const UpdateContent = async (data: Content | any) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}content/update_content`,

      {
        cache: "no-store",
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-access-token": getCookie("token") || "",
        },
        body: JSON.stringify({
          _id: data._id,
          title: data.title,
          description: data.description,
          htmlsnippet: data.htmlsnippet,
          csssnippet: data.csssnippet,
          jssnippet: data.jssnippet,
          liveurl: data.liveurl,
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
export { SaveContent, UpdateContent };
