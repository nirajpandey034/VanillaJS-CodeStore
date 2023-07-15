"use client";
import React, { useState, useEffect } from "react";
import { Container, Grid, TextField, Stack, Typography } from "@mui/material";
import { getCookie } from "typescript-cookie";
import Button from "@mui/material/Button";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import SendIcon from "@mui/icons-material/Send";
import CreateIcon from "@mui/icons-material/Create";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import DynamicFormIcon from "@mui/icons-material/DynamicForm";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import "./style.css";

import { SaveContent, UpdateContent } from "./SaveContent.util";
import getContentWithId from "../Dashboard/dashboard.util";

import LoginModal from "../Login/LoginModal";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

function SaveContentContainer({ contentList }: any) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [htmlCode, setHtmlCode] = useState("");
  const [cssCode, setCssCode] = useState("");
  const [jsCode, setJsCode] = useState("");
  const [liveURL, setLiveUrl] = useState("");
  const [disableButton, setDisableButton] = useState(true);
  const [loadingButton, setLoadingButton] = useState(false);

  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [alignment, setAlignment] = useState("new");
  const [program, setProgram] = useState("");
  const [programId, setProgramId] = useState("");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));

  const getContent = async (id: string) => {
    const data = await getContentWithId(id);
    setTitle(data.title);
    setDescription(data.description);
    setLiveUrl(data.liveurl);
    setHtmlCode(data.htmlsnippet);
    setCssCode(data.csssnippet);
    setJsCode(data.jssnippet);
  };
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setTitle("");
    setDescription("");
    setLiveUrl("");
    setHtmlCode("");
    setCssCode("");
    setJsCode("");
    setAlignment("");
    setProgram("");
    setAlignment(newAlignment);
  };

  const handleSelection = (event: SelectChangeEvent | any) => {
    setProgram(event.target.value);
    getContent(event.target.value.id);
    setProgramId(event.target.value.id);
  };

  const OnSubmit = async (e: any) => {
    setLoadingButton(true);
    e.stopPropagation();
    let status = 0;
    if (alignment === "new") {
      status =
        (await SaveContent({
          title: title,
          description: description,
          htmlsnippet: htmlCode,
          csssnippet: cssCode,
          jssnippet: jsCode,
          liveurl: liveURL,
        })) || 0;
    } else {
      status =
        (await UpdateContent({
          _id: programId,
          title: title,
          description: description,
          htmlsnippet: htmlCode,
          csssnippet: cssCode,
          jssnippet: jsCode,
          liveurl: liveURL,
        })) || 0;
    }

    if (status / 100 === 2) {
      if (alignment === "new") alert("Code Uploaded Successfully");
      else alert("Code Updated Successfully");
      setLoadingButton(false);
      window.location.reload();
    } else {
      if (alignment === "new") alert("Code Uploading failed, Please Try again");
      else alert("Code Updating failed, Please Try again");

      setLoadingButton(false);
    }
  };
  useEffect(() => {
    if (
      title.length > 0 &&
      description.length > 0 &&
      htmlCode.length > 0 &&
      cssCode.length > 0 &&
      jsCode.length > 0
    ) {
      setDisableButton(false);
    } else setDisableButton(true);
  }, [title, description, htmlCode, cssCode, jsCode]);
  useEffect(() => {
    if (getCookie("token")) {
      setOpenLoginModal(false);
    } else setOpenLoginModal(true);
  }, []);
  return (
    <Container
      maxWidth="xl"
      sx={{ height: "100vh", pt: "2rem", pb: "3rem", overflow: "scroll" }}
    >
      {isDesktop && (
        <>
          <Stack direction="column" spacing={5} sx={{ height: "100%" }}>
            <Typography
              variant="h4"
              sx={{ textDecoration: "underline", cursor: "pointer" }}
              onClick={() => {
                window.location.replace(
                  "https://vanillajs-codestore.vercel.app/"
                );
              }}
            >
              <DynamicFormIcon fontSize="large" />
              VanillsJS-CodeStore
            </Typography>
            <ToggleButtonGroup
              color="secondary"
              value={alignment}
              exclusive
              fullWidth
              onChange={handleChange}
              aria-label="Operation"
            >
              <ToggleButton value="new" color="primary">
                <CreateIcon fontSize="small" />
                New
              </ToggleButton>
              <ToggleButton value="update" color="secondary">
                <ChangeCircleIcon fontSize="small" />
                Update
              </ToggleButton>
            </ToggleButtonGroup>
            <Stack direction="column" spacing={5}>
              {/* code list for updation */}
              {alignment === "update" && (
                <FormControl sx={{ width: "100%" }}>
                  <InputLabel id="demo-simple-select-autowidth-label">
                    Select a Program
                  </InputLabel>
                  <Select
                    labelId="program-change-select-label"
                    id="program-change-select"
                    value={program}
                    onChange={handleSelection}
                    fullWidth
                    label="Program"
                    sx={{ backgroundColor: "white", color: "black" }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {contentList?.data.length > 0 &&
                      contentList.data.map(
                        (item: any, index: React.Key | null | undefined) => {
                          return (
                            // eslint-disable-next-line react/jsx-key
                            <MenuItem value={item} key={index}>
                              {item.title}
                            </MenuItem>
                          );
                        }
                      )}
                  </Select>
                </FormControl>
              )}
              {/* code list ends here */}
              <TextField
                label="Title"
                disabled={alignment !== "new"}
                sx={{
                  width: "100%",
                  backgroundColor: "white",
                  color: "black",
                }}
                className="shadow-md"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              ></TextField>
              <TextField
                label="Code Pen URL"
                sx={{
                  width: "100%",
                  backgroundColor: "white",
                  color: "black",
                }}
                className="shadow-md"
                value={liveURL}
                onChange={(e) => {
                  setLiveUrl(e.target.value);
                }}
              ></TextField>

              <TextField
                label="Description"
                sx={{
                  width: "100%",
                  backgroundColor: "white",
                  color: "black",
                }}
                value={description}
                className="shadow-md"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              ></TextField>
            </Stack>
            {/* code section */}
            <Grid container spacing={2}>
              <Grid
                item
                xs={6}
                sx={{
                  height: "20rem",
                  paddingLeft: "0rem !important",
                  pt: "0rem !important",
                }}
                className="shadow-inner"
              >
                <TextField
                  label="HTML"
                  multiline
                  className="codeBox shadow-inner"
                  value={htmlCode}
                  onChange={(e) => {
                    setHtmlCode(e.target.value);
                  }}
                ></TextField>
              </Grid>
              <Grid
                item
                xs={6}
                sx={{
                  height: "20rem",
                  paddingRight: "1rem !important",
                  pt: "0rem !important",
                }}
                className="shadow-inner"
              >
                <TextField
                  label="CSS"
                  multiline
                  className="codeBox"
                  value={cssCode}
                  onChange={(e) => {
                    setCssCode(e.target.value);
                  }}
                ></TextField>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  height: "20rem",
                  padding: "0px  !important",
                  mt: "2rem",
                  paddingRight: "1rem !important",
                }}
                className="shadow-inner"
              >
                <TextField
                  label="Javascript"
                  multiline
                  className="codeBox"
                  value={jsCode}
                  onChange={(e) => {
                    setJsCode(e.target.value);
                  }}
                ></TextField>
              </Grid>
            </Grid>
            {loadingButton ? (
              <button
                disabled
                type="button"
                className="text-white flex-auto justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
                onClick={() => {
                  return;
                }}
              >
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4 mr-3 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
                {alignment === "new" ? <p>Uploading...</p> : <p>Updating...</p>}
              </button>
            ) : (
              <Button
                variant="contained"
                disabled={disableButton}
                endIcon={<SendIcon />}
                className="submitButton"
                onClick={(e) => {
                  OnSubmit(e);
                }}
                sx={{ textTransform: "none" }}
              >
                {alignment === "new" ? <p>Post</p> : <p>Update</p>}
              </Button>
            )}
          </Stack>
          {openLoginModal && (
            <LoginModal setOpenLoginModal={setOpenLoginModal} />
          )}
        </>
      )}
      {isMobile && (
        <div className="desktopRestriction">
          <Typography variant="h5" component="p" sx={{ textAlign: "center" }}>
            Please view this site in Dektop view.
          </Typography>
          <a href="/">Go to Home Page</a>
        </div>
      )}
    </Container>
  );
}

export default SaveContentContainer;
