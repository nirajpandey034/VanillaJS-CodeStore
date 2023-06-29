import React from "react";
import { Grid } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import TerminalIcon from "@mui/icons-material/Terminal";

function ContentListItem({
  item,
  getContent,
  setSelectedItem,
  selectedItem,
}: {
  item: any;
  getContent: any;
  setSelectedItem: any;
  selectedItem: string;
}) {
  return (
    <a
      href="#"
      className="group block max-w-xs mx-auto rounded-lg p-6 bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:bg-sky-500 hover:ring-sky-500"
      style={selectedItem === item.id ? { backgroundColor: "#0ea5e9" } : {}}
      onClick={() => {
        if (selectedItem !== item.id) {
          setSelectedItem(item.id);
          getContent(item.id);
        }
      }}
    >
      <Grid container spacing={4}>
        <Grid item xs={6} md={6} lg={6}>
          <p
            style={{ fontFamily: "Monaco", wordWrap: "break-word" }}
            className="group-hover:text-white"
          >
            {item.title}
          </p>
        </Grid>
        {selectedItem === item?.id && (
          <Grid container item xs={6} spacing={2} justifyContent="center">
            <Grid item>
              {item?.liveurl && (
                <TerminalIcon
                  className="group-hover:stroke-white"
                  onClick={(e) => {
                    window.open(item.liveurl, "_blank")!.focus();
                  }}
                />
              )}
            </Grid>
            <Grid item>
              <EditNoteIcon
                className="group-hover:stroke-white"
                onClick={(e) => {
                  alert("Here, You can make a edit request");
                }}
              />
            </Grid>
          </Grid>
        )}
      </Grid>
    </a>
  );
}

export default ContentListItem;
