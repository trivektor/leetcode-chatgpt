import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { Button, Pagination, Table } from "evergreen-ui";
import { createClient } from "@supabase/supabase-js";

export default function Questions() {
  const onChange = () => {};
  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchQuestions = async (page, limit) => {
    const response = await fetch(`/api/questions?page=${page}&limit=${limit}`);
    const json = await response.json();

    console.log(json);

    setQuestions(json.data);
    setTotalPages(Math.ceil(json.count / 100));
  };
  const onPageChange = (page) => {
    setPage(page);
    fetchQuestions(page, 100);
  };

  useEffect(() => {
    onPageChange(1);
  }, []);

  return (
    <Fragment>
      <Table>
        <Table.Head>
          <Table.SearchHeaderCell
            placeholder="Search question"
            onChange={onChange}
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
      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </Fragment>
  );
}
