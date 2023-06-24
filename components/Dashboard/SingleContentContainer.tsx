import React, { useEffect, useState } from "react";
import Content from "../../interfaces/Content";
import CircularProgress from "@mui/material/CircularProgress";

function SingleContentContainer({
  content,
  loading,
}: {
  content: Content | undefined;
  loading: boolean;
}) {
  const [htmlCode, setHtmlCode] = useState<string>("");
  const [cssCode, setCssCode] = useState<string>("");
  const [jsCode, setJsCode] = useState<string>("");
  useEffect(() => {
    setHtmlCode(content?.htmlsnippet || "");
    setCssCode(content?.csssnippet || "");
    setJsCode(content?.jssnippet || "");
  }, [content]);
  return (
    <div>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <p>{htmlCode}</p>
          <p>{cssCode}</p>
          <p>{jsCode}</p>
        </>
      )}
    </div>
  );
}

export default SingleContentContainer;
