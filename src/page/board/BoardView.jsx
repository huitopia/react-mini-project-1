import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Box, FormControl, FormLabel, Input, Spinner } from "@chakra-ui/react";

export function BoardView() {
  const [board, setBoard] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`/api/board/${id}`)
      .then((res) => setBoard(res.data))
      .catch()
      .finally();
  }, []);

  if (board == null) {
    return <Spinner />;
  }
  return (
    <Box>
      <Box>{board.id}번 게시물</Box>
      <Box>
        <FormControl>
          <FormLabel>title</FormLabel>
          <Input value={board.title} readOnly={true} />
        </FormControl>
      </Box>
      <Box>
        <FormControl>
          <FormLabel>content</FormLabel>
          <Input value={board.content} readOnly={true} />
        </FormControl>
      </Box>
      <Box>
        <FormControl>
          <FormLabel>writer</FormLabel>
          <Input value={board.writer} readOnly={true} />
        </FormControl>
      </Box>
      <Box>
        <FormControl>
          <FormLabel>inserted</FormLabel>
          <Input
            type={"datetime-local"}
            value={board.inserted}
            readOnly={true}
          />
        </FormControl>
      </Box>
    </Box>
  );
}
