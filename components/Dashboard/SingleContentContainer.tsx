import React, { useEffect, useState } from "react";
import Content from "../../interfaces/Content";
import CircularProgress from "@mui/material/CircularProgress";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

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
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
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
            <Tab label="HTML" {...a11yProps(0)} />
            <Tab label="CSS" {...a11yProps(1)} />
            <Tab label="JS" {...a11yProps(2)} />
          </Tabs>
        </Box>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <TabPanel value={value} index={0}>
              <code style={{ fontFamily: "Monaco" }}>{htmlCode}</code>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <code style={{ fontFamily: "Monaco" }}>{cssCode}</code>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <code style={{ fontFamily: "Monaco" }}>{jsCode}</code>
            </TabPanel>
          </>
        )}
      </>
    </div>
  );
}

export default SingleContentContainer;
