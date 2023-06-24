"use client";
import React from "react";
import Item from "../../interfaces/ListItem";
import ContentListItem from "./ContentListItem";
import "./style.css";
import { TextField, Box } from "@mui/material";
function ContentList({ listData, getContent }: any) {
  return (
    <div
      className="class-list"
      style={{
        overflowY: "scroll",
        msOverflowStyle: "none",
      }}
    >
      <Box component="form" noValidate autoComplete="off" sx={{ p: 1 }}>
        {/* functionality yet to be implemented */}
        <TextField
          id="program_search"
          label="Search Program..."
          variant="outlined"
          sx={{ width: "100%" }}
        />
      </Box>
      {listData?.map((item: Item, index: number) => (
        <ContentListItem item={item} key={index} getContent={getContent} />
      ))}
    </div>
  );
}

export default ContentList;
