import { useNavigate } from "react-router-dom";
import { Box, Flex, Spacer } from "@chakra-ui/react";
import { useContext } from "react";
import { LoginContext } from "./LoginProvider.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export function Navbar() {
  const navigate = useNavigate();
  const account = useContext(LoginContext);
  return (
    <Flex gap={3}>
      <Box
        _hover={{ bgColor: "gray.100" }}
        cursor={"pointer"}
        onClick={() => navigate("/")}
      >
        HOME
      </Box>
      {account.isLoggedIn() && (
        <Box
          _hover={{ bgColor: "gray.100" }}
          cursor={"pointer"}
          onClick={() => navigate("/write")}
        >
          Write
        </Box>
      )}
      <Spacer />
      {account.isLoggedIn() && (
        <Box
          onClick={() => navigate(`/member/${account.id}`)}
          cursor={"pointer"}
          _hover={{
            bgColor: "gray.200",
          }}
        >
          {account.nickName}
          <FontAwesomeIcon icon={faUser} />
        </Box>
      )}
      {account.isAdmin() && (
        <Box
          _hover={{ bgColor: "gray.100" }}
          onClick={() => navigate("/member/list")}
          cursor={"pointer"}
        >
          MemberList
        </Box>
      )}
      {account.isLoggedIn() || (
        <Box
          _hover={{ bgColor: "gray.100" }}
          onClick={() => navigate("/signup")}
          cursor={"pointer"}
        >
          SignUp
        </Box>
      )}
      {account.isLoggedIn() || (
        <Box
          onClick={() => navigate("/login")}
          cursor={"pointer"}
          _hover={{
            bgColor: "gray.200",
          }}
        >
          LogIn
        </Box>
      )}
      {account.isLoggedIn() && (
        <Box
          onClick={() => {
            account.logout();
            navigate("/login");
          }}
          cursor={"pointer"}
          _hover={{
            bgColor: "gray.200",
          }}
        >
          LogOut
        </Box>
      )}
    </Flex>
  );
}
