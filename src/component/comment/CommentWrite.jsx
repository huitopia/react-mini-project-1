import { Box, Button, Textarea, Tooltip, useToast } from "@chakra-ui/react";
import { useContext, useState } from "react";
import axios from "axios";
import { LoginContext } from "../LoginProvider.jsx";

export function CommentWrite({ boardId, isProcessing, setIsProcessing }) {
  const [comment, setComment] = useState("");
  const account = useContext(LoginContext);
  const toast = useToast();

  function handleCommentSubmitClick() {
    setIsProcessing(true);
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
      .finally(() => setIsProcessing(false));
  }

  return (
    <Box>
      <Textarea
        isDisabled={!account.isLoggedIn()}
        placeholder={
          account.isLoggedIn()
            ? "댓글 작성 가능"
            : "로그인 유저만 댓글 작성 가능"
        }
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Tooltip
        label={"로그인 필요"}
        isDisabled={account.isLoggedIn()}
        placement={"top"}
      >
        <Button
          isDisabled={comment.trim().length === 0 || !account.isLoggedIn()}
          variant={"outline"}
          isLoading={isProcessing}
          colorScheme={"gray"}
          onClick={handleCommentSubmitClick}
        >
          등록
        </Button>
      </Tooltip>
    </Box>
  );
}
