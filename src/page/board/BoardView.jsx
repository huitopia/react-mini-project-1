import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import "./css/board.css";
import axios from "axios";
import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Spinner,
  Textarea,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { LoginContext } from "../../component/LoginProvider.jsx";
import { faHeart as fullHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as emptyHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CommentComponent } from "../../component/comment/CommentComponent.jsx";

export function BoardView() {
  const [isLikeProcessing, setIsLikeProcessing] = useState(false);
  const [board, setBoard] = useState(null);
  const [like, setLike] = useState({
    like: false,
    count: 0,
  });
  const { id } = useParams();
  const account = useContext(LoginContext);
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    axios
      .get(`/api/board/${id}`)
      .then((res) => {
        setBoard(res.data.board);
        setLike(res.data.like);
      })
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
  function handleClickLike() {
    if (!account.isLoggedIn()) {
      return;
    }
    setIsLikeProcessing(true);
    axios
      .put(`/api/board/like`, { boardId: board.id })
      .then((res) => {
        setLike(res.data);
      })
      .catch(() => {})
      .finally(() => {
        setIsLikeProcessing(false);
      });
  }

  return (
    <Box>
      <Flex mt={5}>
        <Heading>{board.id}번 게시물</Heading>
        <Spacer />
        {isLikeProcessing || (
          <Flex>
            <Tooltip
              hasArrow
              isDisabled={account.isLoggedIn()}
              label="로그인 해주세요"
            >
              <Box onClick={handleClickLike} cursor="pointer" fontSize="3xl">
                {like.like && <FontAwesomeIcon icon={fullHeart} />}
                {like.like || <FontAwesomeIcon icon={emptyHeart} />}
              </Box>
            </Tooltip>
            <Box fontSize="3xl">{like.count}</Box>
          </Flex>
        )}
        {isLikeProcessing && (
          <Box pr={3}>
            <Spinner />
          </Box>
        )}
      </Flex>
      <Box className={"form-box"}>
        <FormControl>
          <FormLabel>title</FormLabel>
          <Input value={board.title} readOnly={true} />
        </FormControl>
      </Box>
      <Box className={"form-box"}>
        <FormControl>
          <FormLabel>content</FormLabel>
          <Textarea readOnly={true}>{board.content}</Textarea>
        </FormControl>
      </Box>
      <Box className={"form-box"}>
        <FormLabel>image</FormLabel>
        {board.fileList &&
          board.fileList.map((file) => (
            <Box border={"2px solid black"} m={3} key={file.name}>
              <Image src={file.src} />
            </Box>
          ))}
      </Box>
      <Box className={"form-box"}>
        <FormControl>
          <FormLabel>writer</FormLabel>
          <Input value={board.writer} readOnly={true} />
        </FormControl>
      </Box>
      <Box className={"form-box"}>
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
        <Center>
          <Box mt={10} mb={20} w={"40%"}>
            <Center>
              <ButtonGroup variant={"outline"} w={"70%"}>
                <Button
                  width="50%"
                  border="2px"
                  colorScheme={"blue"}
                  onClick={() => navigate(`/edit/${board.id}`)}
                >
                  수정
                </Button>
                <Button
                  width="50%"
                  border="2px"
                  colorScheme={"red"}
                  onClick={onOpen}
                >
                  삭제
                </Button>
              </ButtonGroup>
            </Center>
          </Box>
        </Center>
      )}

      {/* Comment */}
      <CommentComponent boardId={board.id} />

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
