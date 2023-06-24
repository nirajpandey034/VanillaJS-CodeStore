import React from "react";
import { Skeleton, Container } from "@mui/material";

function MultilineSkeleton() {
  return (
    <Container maxWidth="lg">
      {new Array(5).fill(0).map((index) => {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "space-around",
              justifyContent: "space-around",
            }}
            key={index}
          >
            <Skeleton />
            <Skeleton animation="wave" />
            <Skeleton animation={false} />
          </div>
        );
      })}
    </Container>
  );
}

export default MultilineSkeleton;
