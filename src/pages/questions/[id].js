import { useRouter } from "next/router";
import DOMPurify from "isomorphic-dompurify";
import { useEffect, useState } from "react";
import { Button, Typography, Drawer } from "@mui/material";
import styled from "@emotion/styled";
import { Container } from "@mui/system";
import { isEmpty } from "lodash";
import ClarificationQuestions from "@/components/clarification-questions";
import ExampleInputs from "@/components/example-inputs";
import ApiKey from "@/components/api-key";

const Question = () => {
  const router = useRouter();
  const { id } = router.query;
  const [question, setQuestion] = useState({});
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const fetchQuestion = async () => {
      const response = await fetch(`/api/questions/${id}`);
      const json = await response.json();

      setQuestion(json);
    };

    fetchQuestion();
  }, [id]);
  const html = question.content ? DOMPurify.sanitize(question.content) : "";

  return (
    <div>
      <Typography variant="h4" sx={{ marginBottom: 3 }}>
        {question.title}
      </Typography>
      {!isEmpty(question) && (
        <Button
          size="small"
          variant="contained"
          color="secondary"
          disableElevation
          onClick={() => setDrawerOpen(true)}
        >
          Get assistence from ChatGPT
        </Button>
      )}

      <QuestionContainer dangerouslySetInnerHTML={{ __html: html }} />
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Container sx={{ padding: 2 }}>
          <ApiKey />
          <ClarificationQuestions question={question} />
          <ExampleInputs question={question} />
        </Container>
      </Drawer>
    </div>
  );
};

export default Question;

const QuestionContainer = styled.div`
  pre {
    font-family: inherit;
  }
`;
