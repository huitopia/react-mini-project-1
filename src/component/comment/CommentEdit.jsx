import { useState } from "react";
import axios from "axios";
import { Box, Button, ButtonGroup, Flex, Textarea } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

export function CommentEdit({
  comment,
  setIsEditing,
  setIsProcessing,
  isProcessing,
}) {
  const [commentText, setCommentText] = useState(comment.comment);

  function handleCommentSubmit() {
    axios
      .put("/api/comment/edit", {
        id: comment.id,
        comment: commentText,
      })
      .then(() => {})
      .catch(() => {})
      .finally(() => {});
  }

  return (
    <Flex>
      <Box flex={1}>
        <Textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
      </Box>
      <Box>
        <ButtonGroup size={"xs"} variant="ghost">
          <Button colorScheme={"blue"} onClick={handleCommentSubmit}>
            <FontAwesomeIcon icon={faCheck} />
          </Button>
          <Button colorScheme={"red"} onClick={() => setIsEditing(false)}>
            <FontAwesomeIcon icon={faXmark} />
          </Button>
        </ButtonGroup>
      </Box>
    </Flex>
  );
}
