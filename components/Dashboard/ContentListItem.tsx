import React from "react";
import { Grid } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";

function ContentListItem({ item, getContent }: { item: any; getContent: any }) {
  return (
    <a
      href="#"
      className="group block max-w-xs mx-auto rounded-lg p-6 bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:bg-sky-500 hover:ring-sky-500"
      onClick={() => {
        getContent(item.id);
      }}
    >
      <Grid container>
        <Grid item xs={8}>
          <p
            style={{ fontFamily: "Monaco", wordWrap: "break-word" }}
            className="group-hover:text-white"
          >
            {item.title}
          </p>
        </Grid>
        <Grid item xs={4}>
          <EditNoteIcon
            className="group-hover:stroke-white"
            onClick={(e) => {
              e.stopPropagation();
              alert("Here, You can make a edit request");
            }}
          />
        </Grid>
      </Grid>
    </a>
  );
}

export default ContentListItem;
