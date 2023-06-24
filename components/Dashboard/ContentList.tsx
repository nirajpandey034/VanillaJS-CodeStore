"use client";
import React from "react";
import Item from "../../interfaces/ListItem";

function ContentList({ listData, getContent }: any) {
  return (
    <div>
      {listData?.map((item: Item, index: number) => (
        <p
          key={index}
          onClick={() => {
            getContent(item.id);
          }}
        >
          {item.title}
        </p>
      ))}
    </div>
  );
}

export default ContentList;
