import { Box, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

export function BoardList() {
  const [boardList, setBoardList] = useState([]);
  // [{id:1,title:"title1",content:"content1"},{},...]
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
                CONTENT <FontAwesomeIcon icon={faPen} />
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {boardList.map((board) => (
              <Tr key={board.id}>
                <Td>{board.id}</Td>
                <Td>{board.title}</Td>
                <Td>{board.content}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}
