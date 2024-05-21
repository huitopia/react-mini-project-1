import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

export function BoardEdit() {
  const { id } = useParams();
  const [board, setBoard] = useState(null);
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    axios.get(`/api/board/${id}`).then((res) => setBoard(res.data));
  }, []);

  function handleClickUpdate() {
    axios
      .put("/api/board/edit", board)
      .then(() => {
        toast({
          status: "success",
          description: "Update Success",
          position: "top",
        });
        navigate(`/board/${board.id}`);
      })
      .catch((err) => {
        if (err.response.status === 400) {
          toast({
            status: "error",
            description: "Error!",
            position: "top",
          });
        }
      })
      .finally(() => {
        onClose();
      });
  }

  if (board == null) {
    return <Spinner />;
  }

  return (
    <Box>
      <Box>{board.id}번 게시물 수정</Box>
      <Box>
        <FormControl>
          <FormLabel>title</FormLabel>
          <Input
            defaultValue={board.title}
            onChange={(e) => setBoard({ ...board, title: e.target.value })}
          />
        </FormControl>
      </Box>
      <Box>
        <FormControl>
          <FormLabel>content</FormLabel>
          <Textarea
            defaultValue={board.content}
            onChange={(e) => setBoard({ ...board, content: e.target.value })}
          ></Textarea>
        </FormControl>
      </Box>
      <Box>
        <FormControl>
          <FormLabel>writer</FormLabel>
          <Input
            defaultValue={board.writer}
            onChange={(e) => setBoard({ ...board, writer: e.target.value })}
          />
        </FormControl>
      </Box>
      <Box>
        <Button onClick={onOpen}>Update</Button>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>{board.id}번 게시물</ModalHeader>
            <ModalBody>Update?</ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>Cancel</Button>
              <Button onClick={handleClickUpdate}>Update</Button>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </Box>
  );
}
