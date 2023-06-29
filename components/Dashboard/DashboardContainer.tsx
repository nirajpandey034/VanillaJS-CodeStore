"use client";
import React, { useState } from "react";
import ContentList from "./ContentList";
import SingleContentContainer from "./SingleContentContainer";
import getContentWithId from "./dashboard.util";
import Content from "../../interfaces/Content";
import { Grid, Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

//  mobile view
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function DashboardContainer({ contentList, jokes }: any) {
  const [singleContent, setSingleContent] = useState<Content | undefined>();

  const [loading, setLoading] = useState<boolean>(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

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
    <Container maxWidth="xl" sx={{ minHeight: "100vh" }}>
      <Grid
        container
        justifyContent="space-between"
        sx={{
          width: { xs: "100%", md: "90%" },
          height: "100%",
          pt: 2,
          // overflowY: "scroll",
        }}
      >
        {isMobile && (
          <Grid item xs={12} className="shadow-lg bg-gray-50 rounded-lg">
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Programs</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={age}
                  label="Programs"
                  // onChange={handleChange}
                >
                  {contentList?.data.map((item: any, index: number) => (
                    <MenuItem
                      value={item.id}
                      key={index}
                      onClick={() => {
                        getContent(item.id);
                      }}
                    >
                      {item.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Grid>
        )}
        {isDesktop && (
          <Grid
            item
            xs={3}
            className="shadow-lg bg-gray-50 rounded-lg"
            sx={{ maxHeight: "100vh", overflowY: "scroll" }}
          >
            <ContentList listData={contentList?.data} getContent={getContent} />
          </Grid>
        )}

        {(isMobile || isDesktop) && (
          <Grid
            item
            xs={12}
            md={8}
            sx={{ maxHeight: "100vh", overflowY: "scroll" }}
          >
            <SingleContentContainer
              content={singleContent}
              loading={loading}
              jokes={jokes}
            />
          </Grid>
        )}
      </Grid>
    </Container>
  );
}

export default DashboardContainer;
