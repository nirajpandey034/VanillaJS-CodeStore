import React, { useEffect, useState } from "react";
import Content from "../../interfaces/Content";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import HtmlIcon from "@mui/icons-material/Html";
import CssIcon from "@mui/icons-material/Css";
import JavascriptIcon from "@mui/icons-material/Javascript";
import MultilineSkeleton from "../shared/Skeleton/MultilineSkeleton";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Chip from "@mui/material/Chip";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      className="single-content-container"
      style={{ overflowX: "scroll" }}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <Chip
              icon={<ContentCopyIcon />}
              label="Copy to clipboard"
              onClick={() => {
                navigator.clipboard.writeText(`${children}`);
              }}
            />
          </div>
          <pre>
            <code>{children}</code>
          </pre>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function SingleContentContainer({
  content,
  loading,
  jokes,
}: {
  content: Content | undefined;
  loading: boolean;
  jokes: any;
}) {
  const [htmlCode, setHtmlCode] = useState<string>("");
  const [cssCode, setCssCode] = useState<string>("");
  const [jsCode, setJsCode] = useState<string>("");
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    if (!content) {
      setHtmlCode((htmlCode) => jokes[0].joke);
      setCssCode((cssCode) => jokes[1].joke);
      setJsCode((jsCode) => jokes[2].joke);
    } else {
      setHtmlCode((htmlCode) => content?.htmlsnippet || htmlCode);
      setCssCode((cssCode) => content?.csssnippet || cssCode);
      setJsCode((jsCode) => content?.jssnippet || jsCode);
    }
  }, [content, jokes]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <div>
      <>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange} aria-label="Code tabs">
            <Tab
              {...a11yProps(0)}
              icon={<HtmlIcon fontSize="large" />}
              iconPosition="start"
            />
            <Tab
              {...a11yProps(1)}
              icon={<CssIcon fontSize="large" />}
              iconPosition="start"
            />
            <Tab
              {...a11yProps(2)}
              icon={<JavascriptIcon fontSize="large" />}
              iconPosition="start"
            />
          </Tabs>
        </Box>
        <div className="shadow-lg bg-gray-50 rounded-lg min-h-screen">
          {loading ? (
            <MultilineSkeleton />
          ) : (
            <>
              <TabPanel value={value} index={0}>
                {htmlCode}
              </TabPanel>
              <TabPanel value={value} index={1}>
                {cssCode}
              </TabPanel>
              <TabPanel value={value} index={2}>
                {jsCode}
              </TabPanel>
            </>
          )}
        </div>
      </>
    </div>
  );
}

export default SingleContentContainer;
