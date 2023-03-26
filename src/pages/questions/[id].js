import { useRouter } from "next/router";
import DOMPurify from "isomorphic-dompurify";
import { useEffect, useState } from "react";

const Question = () => {
  const router = useRouter();
  const { id } = router.query;
  const [question, setQuestion] = useState({});

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
      <h3>{question.title}</h3>
      <div className="question" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
};

export default Question;
