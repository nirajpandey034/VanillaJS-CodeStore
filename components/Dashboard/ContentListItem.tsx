import React from "react";
import { Grid } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";

function ContentListItem({ item, getContent }: { item: any; getContent: any }) {
  return (
    <Grid
      container
      className="hover:border-green-700 border-transparent border-2 hover:border-current rounded-lg py-1"
    >
      <Grid
        item
        xs={8}
        onClick={() => {
          getContent(item.id);
        }}
      >
        <p style={{ fontFamily: "Monaco", wordWrap: "break-word" }}>
          {item.title}
        </p>
      </Grid>
      <Grid item xs={4}>
        <EditNoteIcon
          onClick={() => alert("Here, You can make a edit request")}
        />
      </Grid>
    </Grid>
  );
}

export default ContentListItem;
