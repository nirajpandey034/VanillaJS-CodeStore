"use client";
import React, { useState, useEffect } from "react";
import ContentList from "./ContentList";
import SingleContentContainer from "./SingleContentContainer";
import getContentWithId from "./dashboard.util";

function DashboardContainer({ contentList }: any) {
  const [content, setContent] = useState({});

  const getContent = async (id: string) => {
    const response = await getContentWithId(id);
    setContent(response);
  };
  return (
    <div>
      <ContentList listData={contentList?.data} getContent={getContent} />
      <SingleContentContainer />
    </div>
  );
}

export default DashboardContainer;
