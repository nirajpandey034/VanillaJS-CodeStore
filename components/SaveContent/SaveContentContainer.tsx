import React, { useState, useEffect } from "react";
import { Container, Grid, TextField, Stack, Typography } from "@mui/material";
import { getCookie } from "typescript-cookie";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import "./style.css";

import SaveContent from "./SaveContent.util";

import LoginModal from "../Login/LoginModal";

function SaveContentContainer() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [htmlCode, setHtmlCode] = useState("");
  const [cssCode, setCssCode] = useState("");
  const [jsCode, setJsCode] = useState("");
  const [disableButton, setDisableButton] = useState(true);

  const [openLoginModal, setOpenLoginModal] = useState(false);

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
  const OnSubmit = async () => {
    await SaveContent({
      title: title,
      description: description,
      htmlsnippet: htmlCode,
      csssnippet: cssCode,
      jssnippet: jsCode,
    });
  };

  useEffect(() => {
    if (getCookie("token")) {
      setOpenLoginModal(false);
    } else setOpenLoginModal(true);
  }, [getCookie("token")]);
  return (
    <Container
      maxWidth="xl"
      sx={{ height: "100vh", pt: "2rem", pb: "3rem", overflow: "scroll" }}
    >
      <Stack direction="column" spacing={5} sx={{ height: "100%" }}>
        <Typography
          variant="h4"
          sx={{ textDecoration: "underline", cursor: "pointer" }}
          onClick={() => {
            window.location.replace("https://vanillajs-codestore.vercel.app/");
          }}
        >
          VanillsJS-CodeStore
        </Typography>
        <Stack direction="column" spacing={5}>
          <TextField
            label="Title"
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
        <Button
          variant="contained"
          disabled={disableButton}
          endIcon={<SendIcon />}
          className="submitButton"
          onClick={OnSubmit}
        >
          Submit
        </Button>
      </Stack>
      {openLoginModal && <LoginModal openModal={openLoginModal} />}
    </Container>
  );
}

export default SaveContentContainer;
