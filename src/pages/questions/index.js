import Link from "next/link";
import { Fragment, useState } from "react";
import { Button, Table } from "evergreen-ui";
import { createClient } from "@supabase/supabase-js";

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
          <Table.TextHeaderCell></Table.TextHeaderCell>
        </Table.Head>
        <Table.Body height="100vh">
          {questions.map((question, index) => {
            const { titleSlug, title, difficulty } = question;
            return (
              <Table.Row key={index}>
                <Table.TextCell>{title}</Table.TextCell>
                <Table.TextCell>{difficulty}</Table.TextCell>
                <Table.TextCell>
                  <Link href={`/questions/${titleSlug}`}>
                    <Button appearance="primary">View</Button>
                  </Link>
                </Table.TextCell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </Fragment>
  );
}

export async function getServerSideProps(context) {
  const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  const { data } = await client.from("questions").select();
  console.log({ data });

  return { props: { questions: data } };
}
