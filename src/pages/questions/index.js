import { Fragment, useEffect, useState } from "react";
import {
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  Link,
  CircularProgress,
} from "@mui/material";

const difficultyLabelMappings = {
  easy: "success",
  medium: "warning",
  hard: "error",
};

export default function Questions() {
  const [questions, setQuestions] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchQuestions = async (page, limit) => {
    // TODO: error handling
    setLoading(true);
    const response = await fetch(`/api/questions?page=${page}&limit=${limit}`);
    const json = await response.json();

    setQuestions(json.data);
    setCount(Math.ceil(json.count / 100));
    setLoading(false);
  };
  const onPageChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    fetchQuestions(page, 100);
  }, [page]);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Fragment>
      <Table size="small">
        <TableHead>
          <TableRow sx={{ backgroundColor: "#000" }}>
            <TableCell component="th" sx={{ color: "#fff" }}>
              Question
            </TableCell>
            <TableCell component="th" sx={{ color: "#fff" }} align="right">
              Difficulty
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {questions.map((question, index) => {
            const { id, title, difficulty } = question;
            return (
              <TableRow key={index}>
                <TableCell>
                  <Link underline="none" href={`/questions/${id}`}>
                    {title}
                  </Link>
                </TableCell>
                <TableCell align="right">
                  <Chip
                    size="small"
                    sx={{ minWidth: 80 }}
                    label={difficulty}
                    color={difficultyLabelMappings[difficulty.toLowerCase()]}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Stack spacing={2} sx={{ marginTop: 2, marginBottom: 2 }}>
        <Pagination count={count} page={page} onChange={onPageChange} />
      </Stack>
    </Fragment>
  );
}
