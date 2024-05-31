import { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

export function CommentEdit({
  comment,
  setIsEditing,
  setIsProcessing,
  isProcessing,
}) {
  const [commentText, setCommentText] = useState(comment.comment);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  function handleCommentSubmit() {
    setIsProcessing(true);
    axios
      .put("/api/comment/edit", {
        id: comment.id,
        comment: commentText,
      })
      .then(() => {
        toast({
          status: "success",
          description: "Update Success",
          position: "top",
          duration: 1000,
        });
      })
      .catch(() => {})
      .finally(() => {
        setIsProcessing(false);
        setIsEditing(false);
      });
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
          <Button
            colorScheme={"blue"}
            onClick={onOpen}
            isLoading={isProcessing}
          >
            <FontAwesomeIcon icon={faCheck} />
          </Button>
          <Button colorScheme={"red"} onClick={() => setIsEditing(false)}>
            <FontAwesomeIcon icon={faXmark} />
          </Button>
        </ButtonGroup>
      </Box>
      {/* comment edit modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>수정 확인</ModalHeader>
            <ModalBody>댓글을 수정?</ModalBody>
            <ModalFooter>
              <ButtonGroup size={"xs"} variant="outline">
                <Button onClick={onClose}>cancel</Button>
                <Button colorScheme={"blue"} onClick={handleCommentSubmit}>
                  update
                </Button>
              </ButtonGroup>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </Flex>
  );
}
