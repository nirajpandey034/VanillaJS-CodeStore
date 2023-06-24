"use client";
import React from "react";
import ContentList from "./ContentList";
import SingleContentContainer from "./SingleContentContainer";
import getContentWithId from "./dashboard.util";

function DashboardContainer({ contentList }: any) {
  return (
    <div>
      <ContentList
        listData={contentList.data}
        getContentWithId={getContentWithId}
      />
      <SingleContentContainer />
    </div>
  );
}

export default DashboardContainer;
