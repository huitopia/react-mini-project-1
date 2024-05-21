import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Textarea,
} from "@chakra-ui/react";

export function BoardEdit() {
  const { id } = useParams();
  const [board, setBoard] = useState(null);
  useEffect(() => {
    axios.get(`/api/board/${id}`).then((res) => setBoard(res.data));
  }, []);

  function handleClickUpdate() {
    axios.put(`/api/board/edit`, board);
  }

  if (board == null) {
    return <Spinner />;
  }

  return (
    <Box>
      <Box>{board.id}번 게시물 수정</Box>
      <Box>
        <FormControl>
          <FormLabel>title</FormLabel>
          <Input
            defaultValue={board.title}
            onChange={(e) => setBoard({ ...board, title: e.target.value })}
          />
        </FormControl>
      </Box>
      <Box>
        <FormControl>
          <FormLabel>content</FormLabel>
          <Textarea
            defaultValue={board.content}
            onChange={(e) => setBoard({ ...board, content: e.target.value })}
          ></Textarea>
        </FormControl>
      </Box>
      <Box>
        <FormControl>
          <FormLabel>writer</FormLabel>
          <Input
            defaultValue={board.writer}
            onChange={(e) => setBoard({ ...board, writer: e.target.value })}
          />
        </FormControl>
      </Box>
      <Box>
        <Button onClick={handleClickUpdate}>Update</Button>
      </Box>
    </Box>
  );
}
