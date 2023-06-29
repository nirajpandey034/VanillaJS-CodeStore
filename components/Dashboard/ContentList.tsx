"use client";
import React, { useState } from "react";
import Item from "../../interfaces/ListItem";
import ContentListItem from "./ContentListItem";
import "./style.css";
import { TextField, Box, Typography } from "@mui/material";

import searchTitle from "./content.util";
import { debounce } from "lodash";

import EditRequestModal from "../EditRequest/EditRequestModal";

function ContentList({ listData, getContent }: any) {
  const [selectedItem, setSelectedItem] = useState("");
  const [contentList, setContentList] = useState(listData);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editRequestDetails, setEditRequestDetails] = useState("");

  const getData = async (str: string) => {
    try {
      const { data }: any = await searchTitle(str);
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
      {contentList.length === 0 && (
        <Typography sx={{ textAlign: "center", wordWrap: "break-word" }}>
          We got nothing.{" "}
          <i>
            <a
              href="mailto:nirajpandey034@email.com"
              style={{ textDecoration: "underline", color: "blue" }}
            >
              Please write to us
            </a>
          </i>
          , for any specific requirements.
        </Typography>
      )}
      {contentList.map((item: Item, index: number) => (
        <ContentListItem
          item={item}
          key={index}
          getContent={getContent}
          setSelectedItem={setSelectedItem}
          selectedItem={selectedItem}
          setOpenEditModal={setOpenEditModal}
          setEditRequestDetails={setEditRequestDetails}
        />
      ))}
      {openEditModal && (
        <EditRequestModal
          isOpen={openEditModal}
          setOpenEditModal={setOpenEditModal}
          editRequestDetails={editRequestDetails}
        />
      )}
    </div>
  );
}

export default ContentList;
