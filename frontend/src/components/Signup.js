import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
  } from "@chakra-ui/react";
  import { useDispatch, useSelector } from "react-redux";
  import { signUp } from "../store/actions/userActions";
  import { useNavigate, Link } from "react-router-dom";

  
  export default function Signup() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const { loading, error } = useSelector((state) => state.user);
  
    const handleSignup = (e) => {
      e.preventDefault();
      const data = {
        userName: e.target.userName.value,
        password: e.target.password.value,
      };
      signUp(dispatch, data, navigate);
    };
  
    return (
      <Flex minH={"80vh"} align={"center"} justify={"center"} bg={useColorModeValue("gray.50", "gray.800")}>
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack textAlign={"center"}>
            <Heading fontSize={"4xl"}>Create an account</Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              Sign up to be able to use all of our cool features
            </Text>
          </Stack>
          <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={8}>
            <Stack spacing={4}>
              <form onSubmit={(e) => handleSignup(e)}>
                <FormControl id="userName">
                  <FormLabel>User Name</FormLabel>
                  <Input type="text" name="userName" />
                </FormControl>
                <FormControl id="password">
                  <FormLabel>Password</FormLabel>
                  <Input type="password" name="password" />
                </FormControl>
                <Stack spacing={10}>
                  <Stack direction={{ base: "column", sm: "row" }} align={"start"}>
                    <Text>Already have an account?</Text>
                    <Link to="/login">
                        <Text color={"blue.400"}>Login</Text>
                    </Link>
                  </Stack>
                  {error ? (
                      <Text color="red.500">{error}</Text>
                  ) : null}
  
                  {loading ? (
                      <Button
                      bg={"blue.400"}
                      color={"white"}
                      _hover={{
                        bg: "blue.500",
                      }}
                      type="submit"
                      isLoading
                    >
                      Sign Up
                    </Button>
                  ) : (
                      <Button
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                    type="submit"
                  >
                    Sign Up
                  </Button>
                  )}
                </Stack>
              </form>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }
  