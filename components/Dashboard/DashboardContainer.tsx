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
    <Container maxWidth="xl">
      <Grid
        container
        justifyContent="space-between"
        sx={{ height: "100vh", width: "90%", pt: 2 }}
      >
        <Grid item xs={3}>
          <ContentList listData={contentList?.data} getContent={getContent} />
        </Grid>
        <Grid item xs={8}>
          <SingleContentContainer content={singleContent} loading={loading} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default DashboardContainer;
