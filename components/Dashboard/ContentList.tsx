"use client";
import React from "react";
import Item from "../../interfaces/ListItem";
import ContentListItem from "./ContentListItem";
import "./style.css";
function ContentList({ listData, getContent }: any) {
  return (
    <div
      className="class-list"
      style={{
        overflowY: "scroll",
        msOverflowStyle: "none",
      }}
    >
      {listData?.map((item: Item, index: number) => (
        <ContentListItem item={item} key={index} getContent={getContent} />
      ))}
    </div>
  );
}

export default ContentList;
