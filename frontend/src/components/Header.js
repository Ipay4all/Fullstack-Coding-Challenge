import { Box, Button, Image, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/actions/userActions";
import logo from "../assets/ipayLogo.jpg";
import { useNavigate } from "react-router-dom";

function Header() {
  const dispatch = useDispatch();
  const { userName } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout(dispatch, navigate);
  };

  return (
    <Box
      h="auto"
      justifyContent="space-between"
      alignItems="center"
      display="flex"
      flexDirection={{ base: "column", md: "row" }}
      px="10%"
      py="1em"
      bg="black"
    >
      <Link to="/">
        <Flex align="center" gap="1em">
          <Image src={logo} alt="logo" h="70px" />
          <Text color="white" fontWeight="bold">
            iPay Holdings
          </Text>
        </Flex>
      </Link>

      {userName ? (
        <Flex align="center" gap="4em">
          <Text color="white" fontWeight="bold">
            Welcome | {userName}
          </Text>
          <Button onClick={handleLogout} size="sm">Sign Out</Button>
        </Flex>
      ) : (
        <Flex gap="2em">
          <Link to="/login">
            <Button size="sm">Log In</Button>
          </Link>
          <Link to="/signup">
            <Button size="sm">Sign Up</Button>
          </Link>
        </Flex>
      )}
    </Box>
  );
}

export default Header;
