import React, { useEffect, useState } from "react";
import Content from "../../interfaces/Content";
import CircularProgress from "@mui/material/CircularProgress";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Loader from "../shared/loader/Loader";
import HtmlIcon from "@mui/icons-material/Html";
import CssIcon from "@mui/icons-material/Css";
import JavascriptIcon from "@mui/icons-material/Javascript";
import MultilineSkeleton from "../shared/Skeleton/MultilineSkeleton";

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
}: {
  content: Content | undefined;
  loading: boolean;
}) {
  const [htmlCode, setHtmlCode] = useState<string>(
    "Please Select any code from list"
  );
  const [cssCode, setCssCode] = useState<string>(
    "Please Select any code from list"
  );
  const [jsCode, setJsCode] = useState<string>(
    "Please Select any code from list"
  );
  const [value, setValue] = React.useState(0);
  useEffect(() => {
    setHtmlCode(content?.htmlsnippet || htmlCode);
    setCssCode(content?.csssnippet || cssCode);
    setJsCode(content?.jssnippet || jsCode);
  }, [content, htmlCode, cssCode, jsCode]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <div>
      <>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab
              // label="HTML"
              {...a11yProps(0)}
              icon={<HtmlIcon fontSize="large" />}
              iconPosition="start"
            />
            <Tab
              // label="CSS"
              {...a11yProps(1)}
              icon={<CssIcon fontSize="large" />}
              iconPosition="start"
            />
            <Tab
              // label="JS"
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
