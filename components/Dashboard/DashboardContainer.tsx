"use client";
import React, { useState } from "react";
import ContentList from "./ContentList";
import SingleContentContainer from "./SingleContentContainer";
import getContentWithId from "./dashboard.util";
import Content from "../../interfaces/Content";
import { Grid, Container } from "@mui/material";

function DashboardContainer({ contentList }: any) {
  const [singleContent, setSingleContent] = useState<Content | undefined>();

  const [loading, setLoading] = useState<boolean>(false);

  const getContent = async (id: string) => {
    setLoading(true);
    const data = await getContentWithId(id);
    const obj = {
      title: data.title,
      description: data.description,
      htmlsnippet: data.htmlsnippet,
      csssnippet: data.csssnippet,
      jssnippet: data.jssnippet,
    };
    setSingleContent(obj);
    setLoading(false);
  };
  return (
    <Container maxWidth="lg">
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ height: "100vh" }}
      >
        <Grid item xs={2}>
          <ContentList listData={contentList?.data} getContent={getContent} />
        </Grid>
        <Grid item xs={10}>
          <SingleContentContainer content={singleContent} loading={loading} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default DashboardContainer;
