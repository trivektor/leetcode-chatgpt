import { Button } from "@mui/material";
import styled from "@emotion/styled";
import { useState } from "react";
import { toast } from "react-toastify";

function strip(html) {
  let doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
}

const ExampleInputs = ({ question }) => {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const onClick = async () => {
    setLoading(true);

    try {
      const res = await fetch(
        `/api/questions/chatgpt?apiKey=${localStorage.getItem(
          "chatgptApiKey"
        )}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            promptType: "exampleInputs",
            question: strip(question.content),
          }),
        }
      );
      const json = await res.json();
      setResponse(json.text);
    } catch (err) {
      console.error(err);
      toast.error("An error occurred. Please try again later!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <p>What inputs should I expect for this problem?</p>
      <Button
        disabled={loading}
        variant="outlined"
        color="secondary"
        size="small"
        onClick={onClick}
      >
        See ChatGPT{"'"}s response
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
