import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function BoardWrite() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [writer, setWriter] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  function handleSaveClick() {
    setLoading(true);
    axios
      .post("/api/board/add", {
        title,
        content,
        writer,
      })
      .then(() => {
        toast({
          description: "new content create",
          status: "success",
          position: "top",
        });
        navigate("/");
      })
      .catch((e) => {
        const code = e.response.status;
        if (code === 400) {
          toast({
            status: "error",
            description: "contents error",
            position: "top",
          });
        }
      })
      .finally(() => setLoading(false));
  }

  let disableSaveButton = false;
  if (title.trim().length === 0) {
    disableSaveButton = true;
  }
  if (content.trim().length === 0) {
    disableSaveButton = true;
  }
  if (writer.trim().length === 0) {
    disableSaveButton = true;
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
          <Button
            isLoading={loading}
            isDisabled={disableSaveButton}
            colorScheme={"blue"}
            onClick={handleSaveClick}
          >
            save
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
