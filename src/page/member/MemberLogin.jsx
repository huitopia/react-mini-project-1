import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../component/LoginProvider.jsx";

export function MemberLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const navigate = useNavigate();
  const account = useContext(LoginContext);

  function handleLogin() {
    axios
      .post("/api/member/token", { email, password })
      .then((res) => {
        account.login(res.data.token);
        toast({
          status: "success",
          description: "login ok",
          position: "top",
          duration: 1000,
        });
        navigate("/");
      })
      .catch(() => {
        account.logout();
        toast({
          status: "warning",
          description: "fail",
          position: "top",
          duration: 1000,
        });
      });
  }

  return (
    <Center>
      <Box w={"60%"}>
        <Box mb={10}>
          <Heading>로그인</Heading>
        </Box>
        <Box>
          <Box mb={8}>
            <FormControl>
              <FormLabel>이메일</FormLabel>
              <Input onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
          </Box>
          <Box mb={8}>
            <FormControl>
              <FormLabel>암호</FormLabel>
              <Input onChange={(e) => setPassword(e.target.value)} />
            </FormControl>
          </Box>
          <Box>
            <Center>
              <Button
                onClick={handleLogin}
                colorScheme={"blue"}
                variant={"outline"}
                size="md"
                height="48px"
                width="30%"
                border="2px"
              >
                로그인
              </Button>
            </Center>
          </Box>
        </Box>
      </Box>
    </Center>
  );
}
