import "../styles/globals.scss";
import { Fragment } from "react";
import Image from "next/image";
import { Alert } from "evergreen-ui";

export default function App({ Component, pageProps }) {
  return (
    <Fragment>
      <div className="header">
        <strong>Practice LeetCode questions with ChatGPT</strong>
        <a href="https://www.buymeacoffee.com/trivektor" target="_blank">
          <Image
            src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
            width={128}
            height={36}
            alt="Buy me a coffee"
          />
        </a>
      </div>
      <main className="main">
        <Alert intent="none" title="Set your Open AI API Key" />
        <Component {...pageProps} />
      </main>
    </Fragment>
  );
}
