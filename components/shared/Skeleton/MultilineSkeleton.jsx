import React from "react";
import { Skeleton, Container } from "@mui/material";

function MultilineSkeleton() {
  return (
    <Container maxWidth="lg">
      {new Array(3).fill(0).map((index) => {
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
            <Skeleton sx={{ width: "100%" }} />
            <Skeleton animation="wave" sx={{ width: "60%" }} />
            <Skeleton animation={false} sx={{ width: "40%" }} />
            <Skeleton animation="wave" sx={{ width: "30%" }} />
            <Skeleton animation={false} sx={{ width: "80%" }} />
            <Skeleton animation="wave" sx={{ width: "50%" }} />
            <Skeleton animation={false} sx={{ width: "90%" }} />
            <Skeleton animation={false} sx={{ width: "40%" }} />
            <Skeleton animation="wave" sx={{ width: "30%" }} />
            <Skeleton animation={false} sx={{ width: "80%" }} />
          </div>
        );
      })}
    </Container>
  );
}

export default MultilineSkeleton;
