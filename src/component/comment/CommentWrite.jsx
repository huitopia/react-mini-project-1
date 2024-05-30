import { Box, Button, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";

export function CommentWrite({ boardId }) {
  const [comment, setComment] = useState("");

  function handleCommentSubmitClick() {
    axios
      .post("/api/comment/add", {
        boardId,
        comment,
      })
      .then((res) => {})
      .catch(() => {})
      .finally(() => {});
  }

  return (
    <Box>
      <Textarea
        placeholder={"댓글 작성하는 곳"}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Button colorScheme={"blue"} onClick={handleCommentSubmitClick}>
        등록
      </Button>
    </Box>
  );
}
