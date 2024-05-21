import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";

export function BoardWrite() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [writer, setWriter] = useState("");

  function handleSaveClick() {
    axios.post("/api/board/add", {
      title,
      content,
      writer,
    });
  }

  return (
    <Box>
      <Box>글 작성 화면</Box>
      <Box>
        <Box>
          <FormControl>
            <FormLabel>title</FormLabel>
            <Input onChange={(e) => setTitle(e.target.value)} />
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>contents</FormLabel>
            <Textarea onChange={(e) => setContent(e.target.value)} />
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>writer</FormLabel>
            <Input onChange={(e) => setWriter(e.target.value)} />
          </FormControl>
        </Box>
        <Box>
          <Button colorScheme={"blue"} onClick={handleSaveClick}>
            save
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
