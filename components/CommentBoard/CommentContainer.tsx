import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function CommentContainer({
  title,
  comments,
}: {
  title: any;
  comments: any;
}) {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>
            <strong>{title}</strong>
          </Typography>
        </AccordionSummary>

        {comments.map((comment: any, index: any) => {
          return (
            <AccordionDetails key={index}>
              <strong>{index + 1}</strong> . {comment.comment}
            </AccordionDetails>
          );
        })}
      </Accordion>
    </div>
  );
}
