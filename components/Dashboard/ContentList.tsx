"use client";
import React from "react";
import Item from "../../interfaces/ListItem";
import ContentListItem from "./ContentListItem";

function ContentList({ listData, getContent }: any) {
  return (
    <div>
      {listData?.map((item: Item, index: number) => (
        <ContentListItem item={item} key={index} getContent={getContent} />
      ))}
    </div>
  );
}

export default ContentList;
