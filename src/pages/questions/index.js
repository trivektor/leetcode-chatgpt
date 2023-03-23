import fs from "fs";
import path from "path";
import Link from "next/link";
import { Fragment, useState } from "react";
import { Table } from "evergreen-ui";

export default function Questions(props) {
  const [filter, setFilter] = useState("");
  const onChange = (value) => {
    setFilter(value);
    setQuestions(
      props.questions.filter(({ title }) =>
        title.toLowerCase().includes(filter.toLowerCase())
      )
    );
  };
  const [questions, setQuestions] = useState(props.questions);

  return (
    <Fragment>
      <Table>
        <Table.Head>
          <Table.SearchHeaderCell
            placeholder="Search question"
            onChange={onChange}
            value={filter}
          />
          <Table.TextHeaderCell>Difficulty</Table.TextHeaderCell>
        </Table.Head>
        <Table.Body height="100vh">
          {questions.map((question, index) => {
            const { titleSlug, title, difficulty } = question;
            return (
              <Table.Row key={index}>
                <Table.TextCell>{title}</Table.TextCell>
                <Table.TextCell>{difficulty}</Table.TextCell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </Fragment>
  );
}

export async function getServerSideProps(context) {
  const questions = fs.readFileSync(path.join(process.cwd(), "questions.json"));

  return { props: { questions: JSON.parse(questions) } };
}
