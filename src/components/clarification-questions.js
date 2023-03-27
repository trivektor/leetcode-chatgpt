import { Button } from "@mui/material";
import styled from "@emotion/styled";
import { useState } from "react";

function strip(html) {
  let doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
}

const ClarificationQuestions = ({ question }) => {
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
          prompt:
            "What clarification questions should I ask for this algorithm problem:",
          question: strip(question.content),
        }),
      }
    );
    const json = await res.json();
    setResponse(json.text);
  };

  return (
    <>
      <p>What clarification questions can I ask about this problem?</p>
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

export default ClarificationQuestions;

const Response = styled.pre`
  font-family: inherit;
  white-space: pre-wrap;
`;
