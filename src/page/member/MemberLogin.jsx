import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function MemberLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  function handleLogin() {
    axios
      .post("/api/member/token", { email, password })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        toast({
          status: "success",
          description: "login ok",
          position: "top",
        });
        navigate("/");
      })
      .catch(() => {
        localStorage.removeItem("token"); // token delete
        toast({
          status: "warning",
          description: "fail",
          position: "top",
        });
      });
  }

  return (
    <Box>
      <Box>로그인</Box>
      <Box>
        <Box>
          <FormControl>
            <FormLabel>이메일</FormLabel>
            <Input onChange={(e) => setEmail(e.target.value)} />
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>암호</FormLabel>
            <Input onChange={(e) => setPassword(e.target.value)} />
          </FormControl>
        </Box>
        <Box>
          <Button onClick={handleLogin} colorScheme={"blue"}>
            로그인
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
