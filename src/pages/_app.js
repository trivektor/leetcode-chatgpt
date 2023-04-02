import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Image from "next/image";
import Head from "next/head";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  CssBaseline,
  IconButton,
} from "@mui/material";
import { Fragment } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }) {
  return (
    <Fragment>
      <Head>
        <title>LeetCode Questions with ChatGPT Assistance</title>
      </Head>
      <CssBaseline />
      <ToastContainer />
      <AppBar position="static" elevation={0} sx={{ background: "#000" }}>
        <Toolbar>
          <IconButton>
            <Image
              src="https://img.icons8.com/external-flaticons-flat-flat-icons/64/null/external-code-no-code-flaticons-flat-flat-icons-2.png"
              width={38}
              height={38}
              alt="LeetCode Questions with ChatGPT Assistance"
            />
          </IconButton>
          <Typography sx={{ flexGrow: 1 }}>
            LeetCode Questions with ChatGPT assistance
          </Typography>
          <a href="https://www.buymeacoffee.com/trivektor" target="_blank">
            <Image
              src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
              width={128}
              height={36}
              alt="Buy me a coffee"
            />
          </a>
        </Toolbar>
      </AppBar>
      <Container sx={{ marginTop: 2 }}>
        <Component {...pageProps} />
      </Container>
    </Fragment>
  );
}
