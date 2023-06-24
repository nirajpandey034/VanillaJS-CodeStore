"use client";
import React from "react";
import Item from "../../interfaces/ListItem";

function ContentList({ listData, getContentWithId }: any) {
  return (
    <div>
      {listData?.map((item: Item, index: number) => (
        <p
          key={index}
          onClick={() => {
            getContentWithId(item.id);
          }}
        >
          {item.id} - {item.title}
        </p>
      ))}
    </div>
  );
}

export default ContentList;
