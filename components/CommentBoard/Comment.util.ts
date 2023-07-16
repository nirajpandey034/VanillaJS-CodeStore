interface obj {
  title: string;
  id: string;
  comments: any;
}
export const groupComments = (comments: any) => {
  let obj: any = {};
  comments.map((item: any) => {
    if (!obj[item.title]) obj[item.title] = [item];
    else {
      obj[item.title] = [...obj[item.title], item];
    }
  });
  return obj;
};
