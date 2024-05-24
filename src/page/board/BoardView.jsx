import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
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
import { LoginContext } from "../../component/LoginProvider.jsx";

export function BoardView() {
  const [board, setBoard] = useState(null);
  const { id } = useParams();
  const account = useContext(LoginContext);
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onClose, onOpen } = useDisclosure();
  useEffect(() => {
    axios
      .get(`/api/board/${id}`)
      .then((res) => setBoard(res.data))
      .catch((err) => {
        if (err.response.status == 404) {
          toast({
            status: "info",
            description: "not found content",
            position: "top",
          });
          navigate("/");
        }
      })
      .finally();
  }, []);
  function handleClickRemove() {
    axios
      .delete(`/api/board/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        toast({
          status: "success",
          description: `${id}번 게시물이 삭제되었습니다.`,
          position: "top",
        });
        navigate("/");
      })
      .catch(() => {
        toast({
          status: "error",
          description: `${id}번 게시물 삭제 중 오류 발생`,
          position: "top",
        });
      })
      .finally(() => {
        onClose(); // modal
      });
  }
  if (board == null) {
    return <Spinner />;
  }

  return (
    <Box>
      <Box>{board.id}번 게시물</Box>
      <Box>
        <FormControl>
          <FormLabel>title</FormLabel>
          <Input value={board.title} readOnly={true} />
        </FormControl>
      </Box>
      <Box>
        <FormControl>
          <FormLabel>content</FormLabel>
          <Textarea readOnly={true}>{board.content}</Textarea>
        </FormControl>
      </Box>
      <Box>
        <FormControl>
          <FormLabel>writer</FormLabel>
          <Input value={board.writer} readOnly={true} />
        </FormControl>
      </Box>
      <Box>
        <FormControl>
          <FormLabel>inserted</FormLabel>
          <Input
            type={"datetime-local"}
            value={board.inserted}
            readOnly={true}
          />
        </FormControl>
      </Box>
      {account.hasAccess(board.memberId) && (
        <Box>
          <Button
            colorScheme={"cyan"}
            onClick={() => navigate(`/edit/${board.id}`)}
          >
            수정
          </Button>
          <Button colorScheme={"red"} onClick={onOpen}>
            삭제
          </Button>
        </Box>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>{board.id}번 게시물</ModalHeader>
            <ModalBody>delete?</ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>Cancel</Button>
              <Button colorScheme={"red"} onClick={handleClickRemove}>
                Delete
              </Button>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </Box>
  );
}
