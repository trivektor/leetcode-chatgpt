import { Button } from "@mui/material";
import styled from "@emotion/styled";
import { useState } from "react";

function strip(html) {
  let doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
}

const ExampleInputs = ({ question }) => {
  const [response, setResponse] = useState("");
  const onClick = async () => {
    const res = await fetch(
      `/api/questions/chatgpt?apiKey=${localStorage.getItem("chatgptApiKey")}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: "What inputs could I expect for this agorithm problem:",
          question: strip(question.content),
        }),
      }
    );
    const json = await res.json();
    setResponse(json.text);
  };

  return (
    <>
      <p>What inputs should I expect for this problem?</p>
      <Button
        variant="outlined"
        color="secondary"
        size="small"
        onClick={onClick}
      >
        See ChatGPT's response
      </Button>
      <Response>{response}</Response>
    </>
  );
};

export default ExampleInputs;

const Response = styled.pre`
  font-family: inherit;
  white-space: pre-wrap;
`;
