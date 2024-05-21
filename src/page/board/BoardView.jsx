import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Textarea,
  useToast,
} from "@chakra-ui/react";

export function BoardView() {
  const [board, setBoard] = useState(null);
  const { id } = useParams();
  const toast = useToast();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`/api/board/${id}`)
      .then((res) => setBoard(res.data))
      .catch((err) => {
        if (err.response.status == 404) {
          toast({
            status: "info",
            description: "not found content",
            position: "top",
          });
          navigate("/");
        }
      })
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
          <Textarea readOnly={true}>{board.content}</Textarea>
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
