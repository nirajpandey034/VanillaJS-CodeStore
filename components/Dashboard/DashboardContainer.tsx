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
    <Container maxWidth="xl" sx={{ height: "100vh" }}>
      <Grid
        container
        justifyContent="space-between"
        sx={{ width: "90%", height: "100%", pt: 2, overflowY: "scroll" }}
      >
        <Grid item xs={3} className="shadow-lg bg-gray-50 rounded-lg">
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
