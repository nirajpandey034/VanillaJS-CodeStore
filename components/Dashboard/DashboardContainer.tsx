"use client";
import React, { useState } from "react";
import ContentList from "./ContentList";
import SingleContentContainer from "./SingleContentContainer";
import getContentWithId from "./dashboard.util";
import Content from "../../interfaces/Content";
import isObjectEmpty from "@/utilities/isObjectEmpty";

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
    <div>
      <ContentList listData={contentList?.data} getContent={getContent} />
      <SingleContentContainer content={singleContent} loading={loading} />
    </div>
  );
}

export default DashboardContainer;
