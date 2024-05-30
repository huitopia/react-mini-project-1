import { Box, Button, Textarea, useToast } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";

export function CommentWrite({ boardId, isSending, setIsSending }) {
  const [comment, setComment] = useState("");

  const toast = useToast();

  function handleCommentSubmitClick() {
    setIsSending(true);
    axios
      .post("/api/comment/add", {
        boardId,
        comment,
      })
      .then((res) => {
        setComment("");
        toast({
          status: "success",
          description: "댓글 작성 완료",
          position: "top",
          duration: 1000,
        });
      })
      .catch(() => {})
      .finally(() => setIsSending(false));
  }

  return (
    <Box>
      <Textarea
        placeholder={"댓글 작성하는 곳"}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Button
        isLoading={isSending}
        colorScheme={"blue"}
        onClick={handleCommentSubmitClick}
      >
        등록
      </Button>
    </Box>
  );
}
