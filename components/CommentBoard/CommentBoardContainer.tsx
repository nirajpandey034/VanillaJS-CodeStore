"use client";
import React, { useState, useEffect } from "react";
import { groupComments } from "./Comment.util";
import CommentContainer from "./CommentContainer";
import { Grid } from "@mui/material";
export default function CommentBoardContainer({ commentList }: any) {
  const [groupedComments, setGroupedComments] = useState<any>({});
  useEffect(() => {
    const data = groupComments(commentList.comments);
    setGroupedComments(data);
  }, [commentList]);
  return (
    <>
      <Grid container direction="column" justifyContent="center">
        {Object.keys(groupedComments).map((item: any, index) => {
          return (
            <Grid item xs={12} key={index}>
              <CommentContainer title={item} comments={groupedComments[item]} />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}
