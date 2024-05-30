import { Box, Button, Flex, Spacer, useToast } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function CommentItem({ comment, isProcessing, setIsProcessing }) {
  const toast = useToast();
  const navigate = useNavigate();
  function handleRemoveClick() {
    setIsProcessing(true);
    axios
      .delete(`/api/comment/remove`, {
        data: { id: comment.id, memberId: comment.memberId },
      })
      .then(
        toast({
          status: "success",
          description: "remove comment",
          position: "top",
          duration: 1000,
        }),
      )
      .catch()
      .finally(() => setIsProcessing(false));
  }

  return (
    <Box border="1px solid gray" my={3}>
      <Flex>
        <Box>{comment.nickName}</Box>
        <Spacer />
        <Box>{comment.inserted}</Box>
      </Flex>
      <Flex>
        <Box>{comment.comment}</Box>
        <Spacer />
        <Box>
          <Button
            size={"xs"}
            variant="ghost"
            colorScheme={"red"}
            onClick={handleRemoveClick}
            isLoading={isProcessing}
          >
            <FontAwesomeIcon icon={faXmark} />
          </Button>
        </Box>
      </Flex>
    </Box>
  );
}
