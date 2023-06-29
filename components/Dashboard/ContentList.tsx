"use client";
import React, { useState } from "react";
import Item from "../../interfaces/ListItem";
import ContentListItem from "./ContentListItem";
import "./style.css";
import { TextField, Box } from "@mui/material";

import searchTitle from "./content.util";
import { debounce } from "lodash";

function ContentList({ listData, getContent }: any) {
  const [selectedItem, setSelectedItem] = useState("");
  const [contentList, setContentList] = useState(listData);

  const getData = async (str: string) => {
    try {
      const { data }: any = await searchTitle(str);
      console.log(data.data);
      setContentList(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const debouncedSearch = debounce(async (str: string) => {
    await getData(str);
  }, 300);

  return (
    <div className="class-list">
      <Box component="form" noValidate autoComplete="off" sx={{ p: 1 }}>
        {/* functionality yet to be implemented */}
        <TextField
          id="program_search"
          label="Search Program..."
          variant="outlined"
          sx={{ width: "100%" }}
          onChange={(e) => {
            debouncedSearch(e.target.value);
          }}
        />
      </Box>
      {contentList?.map((item: Item, index: number) => (
        <ContentListItem
          item={item}
          key={index}
          getContent={getContent}
          setSelectedItem={setSelectedItem}
          selectedItem={selectedItem}
        />
      ))}
    </div>
  );
}

export default ContentList;
