import fs from "fs";
import path from "path";
import { useRouter } from "next/router";

import DOMPurify from "isomorphic-dompurify";

const Question = (props) => {
  const router = useRouter();
  const { slug } = router.query;
  const question = props.questions.find(({ titleSlug }) => titleSlug === slug);
  const html = DOMPurify.sanitize(question.content);

  return (
    <div>
      <h3>{question.title}</h3>
      <div className="question" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
};

export default Question;

export async function getServerSideProps(context) {
  const questions = fs.readFileSync(path.join(process.cwd(), "questions.json"));

  return { props: { questions: JSON.parse(questions) } };
}
