import { useRouter } from "next/router";
import DOMPurify from "isomorphic-dompurify";
import { Fragment, useEffect, useState } from "react";
import { Button, Typography, Drawer, CircularProgress } from "@mui/material";
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchQuestion = async () => {
      // TODO: error handling
      setLoading(true);
      const response = await fetch(`/api/questions/${id}`);
      const json = await response.json();

      setQuestion(json);
      setLoading(false);
    };

    fetchQuestion();
  }, [id]);

  if (loading) {
    return <CircularProgress />;
  }

  const html = question.content ? DOMPurify.sanitize(question.content) : "";

  return (
    <Fragment>
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
    </Fragment>
  );
};

export default Question;

const QuestionContainer = styled.div`
  pre {
    font-family: inherit;
  }
`;
