import { Box, Center, Heading } from "@chakra-ui/react";
import { CommentWrite } from "./CommentWrite.jsx";
import { CommentList } from "./CommentList.jsx";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";

export function CommentComponent({ boardId }) {
  const [isProcessing, setIsProcessing] = useState(false);
  return (
    <Box mt={20}>
      <Center mb={7}>
        <Heading size={"md"}>
          <FontAwesomeIcon icon={faComments} /> COMMENTS
        </Heading>
      </Center>
      <Center>
        <CommentWrite
          boardId={boardId}
          isProcessing={isProcessing}
          setIsProcessing={setIsProcessing}
        />
      </Center>
      <CommentList
        boardId={boardId}
        isProcessing={isProcessing}
        setIsProcessing={setIsProcessing}
      />
    </Box>
  );
}
