import { Box, Button, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import axios from "axios";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useSearchParams } from "react-router-dom";

export function BoardList() {
  const [boardList, setBoardList] = useState([]);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  useEffect(() => {
    axios
      .get(`/api/board/list?${searchParams}`)
      .then((res) => setBoardList(res.data))
      .catch()
      .finally();
  }, [searchParams]); // searchParams 변경 시 함수 재실행
  return (
    <Box>
      <Box>게시물 목록</Box>
      <Box>
        <Table>
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th>TITLE</Th>
              <Th>
                <FontAwesomeIcon icon={faUserSecret} />
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {boardList.map((board) => (
              <Tr
                onClick={() => navigate(`/board/${board.id}`)}
                key={board.id}
                _hover={{ bgColor: "gray.100" }}
                cursor={"pointer"}
              >
                <Td>{board.id}</Td>
                <Td>{board.title}</Td>
                <Td>{board.writer}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      <Box>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((pageNumber) => (
          <Button
            onClick={() => navigate(`/?page=${pageNumber}`)}
            key={pageNumber}
          >
            {pageNumber}
          </Button>
        ))}
      </Box>
    </Box>
  );
}
