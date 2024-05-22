import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";

export function MemberSignup() {
  const [email, setEmail] = useState("");
  const [isCheckedEmail, setIsCheckedEmail] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState();
  const toast = useToast();

  function handleCheckEmail() {
    axios
      .get(`api/member/check?email=${email}`)
      .then((res) => {
        toast({
          status: "warning",
          description: "change email please",
          position: "top",
        });
      })
      .catch((err) => {
        if (err.response.status === 404) {
          toast({
            status: "info",
            description: "ok use email",
            position: "top",
          });
          setIsCheckedEmail(true);
        }
      })
      .finally();
  }

  return (
    <Box>
      <Box>SignUp</Box>
      <Box>
        <Box>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <InputGroup>
              <Input
                type={"email"}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setIsCheckedEmail(false);
                  setIsValidEmail(!e.target.validity.typeMismatch);
                }}
              />
              <InputRightElement w={"75px"} mr={1}>
                <Button
                  isDisabled={!isValidEmail || email.trim().length == 0}
                  onClick={handleCheckEmail}
                  size={"sm"}
                >
                  중복확인
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
}
