import { useNavigate } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";

export function Navbar() {
  const navigate = useNavigate();
  return (
    <Flex gap={3}>
      <Box
        _hover={{ bgColor: "gray.100" }}
        cursor={"pointer"}
        onClick={() => navigate("/")}
      >
        HOME
      </Box>
      <Box
        _hover={{ bgColor: "gray.100" }}
        cursor={"pointer"}
        onClick={() => navigate("/write")}
      >
        Write
      </Box>
      <Box
        _hover={{ bgColor: "gray.100" }}
        onClick={() => navigate("/member/list")}
        cursor={"pointer"}
      >
        MemberList
      </Box>
      <Box
        _hover={{ bgColor: "gray.100" }}
        onClick={() => navigate("/signup")}
        cursor={"pointer"}
      >
        SignUp
      </Box>
      <Box
        onClick={() => navigate("/login")}
        cursor={"pointer"}
        _hover={{
          bgColor: "gray.200",
        }}
      >
        LogIn
      </Box>
      <Box
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/login");
        }}
        cursor={"pointer"}
        _hover={{
          bgColor: "gray.200",
        }}
      >
        LogOut
      </Box>
    </Flex>
  );
}
