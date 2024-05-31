import { useNavigate } from "react-router-dom";
import { Center, Flex, Spacer } from "@chakra-ui/react";
import { useContext } from "react";
import { LoginContext } from "./LoginProvider.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEarthAsia, faUser } from "@fortawesome/free-solid-svg-icons";

export function Navbar() {
  const navigate = useNavigate();
  const account = useContext(LoginContext);
  return (
    <Flex
      gap={3}
      px={{
        lg: 200,
        base: 0,
      }}
      h={20}
      bgColor="blue.50"
      color={"gray.700"}
    >
      <Center
        _hover={{ color: "blue.600" }}
        cursor={"pointer"}
        onClick={() => navigate("/")}
        p={8}
        fontSize={30}
        fontWeight={600}
      >
        <FontAwesomeIcon icon={faEarthAsia} />
      </Center>
      {account.isLoggedIn() && (
        <Center
          _hover={{ color: "blue.600" }}
          cursor={"pointer"}
          onClick={() => navigate("/write")}
          p={8}
          fontSize={20}
          fontWeight={600}
        >
          Write
        </Center>
      )}
      <Spacer />
      {account.isLoggedIn() && (
        <Center
          onClick={() => navigate(`/member/${account.id}`)}
          cursor={"pointer"}
          _hover={{ color: "blue.600" }}
          p={8}
          fontSize={20}
          fontWeight={600}
          gap={2}
        >
          {account.nickName}
          <FontAwesomeIcon icon={faUser} />
        </Center>
      )}
      {account.isAdmin() && (
        <Center
          _hover={{ color: "blue.600" }}
          onClick={() => navigate("/member/list")}
          cursor={"pointer"}
          p={8}
          fontSize={20}
          fontWeight={600}
        >
          Member
        </Center>
      )}
      {account.isLoggedIn() || (
        <Center
          _hover={{ color: "blue.600" }}
          onClick={() => navigate("/signup")}
          cursor={"pointer"}
          p={8}
          fontSize={20}
          fontWeight={600}
        >
          SignUp
        </Center>
      )}
      {account.isLoggedIn() || (
        <Center
          onClick={() => navigate("/login")}
          cursor={"pointer"}
          _hover={{ color: "blue.600" }}
          p={8}
          fontSize={20}
          fontWeight={600}
        >
          LogIn
        </Center>
      )}
      {account.isLoggedIn() && (
        <Center
          onClick={() => {
            account.logout();
            navigate("/login");
          }}
          cursor={"pointer"}
          _hover={{ color: "blue.600" }}
          p={8}
          fontSize={15}
          fontWeight={600}
        >
          LogOut
        </Center>
      )}
    </Flex>
  );
}
