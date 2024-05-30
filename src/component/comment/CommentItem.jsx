import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export function CommentItem({ comment, isProcessing, setIsProcessing }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  function handleRemoveClick() {
    setIsProcessing(true);
    axios
      .delete(`/api/comment/remove`, {
        data: { id: comment.id, memberId: comment.memberId },
      })
      .then()
      .catch()
      .finally(() => {
        onClose();
        setIsProcessing(false);
        toast({
          status: "success",
          description: "remove comment",
          position: "top",
          duration: 1000,
        });
      });
  }

  return (
    <Center>
      <Box bgColor={"gray.100"} mb={3} borderRadius="15" w={"80%"}>
        <Box m={3}>
          <Flex>
            <Box>
              <Heading size={"sm"}>{comment.nickName}</Heading>
            </Box>
            <Spacer />
            <Box>
              <Text fontSize={"sm"} as="sup">
                {comment.inserted}
              </Text>
            </Box>
          </Flex>
          <Flex ml={3}>
            <Box>{comment.comment}</Box>
            <Spacer />
            <Box>
              <Button
                size={"xs"}
                variant="ghost"
                colorScheme={"red"}
                onClick={onOpen}
                isLoading={isProcessing}
              >
                <FontAwesomeIcon icon={faXmark} />
              </Button>
            </Box>
          </Flex>
        </Box>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay>
            <ModalContent>
              <ModalHeader>삭제 확인</ModalHeader>
              <ModalBody>댓글 삭제?</ModalBody>
              <ModalFooter>
                <ButtonGroup size={"xs"} variant="outline">
                  <Button onClick={onClose}>cancel</Button>
                  <Button colorScheme={"red"} onClick={handleRemoveClick}>
                    delete
                  </Button>
                </ButtonGroup>
              </ModalFooter>
            </ModalContent>
          </ModalOverlay>
        </Modal>
      </Box>
    </Center>
  );
}
