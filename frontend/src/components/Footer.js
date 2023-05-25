import { Box, Container, Icon, Image, Stack, Text } from "@chakra-ui/react";
import logo from "../assets/ipayLogo.jpg";
import { FaLinkedin, FaWhatsapp, FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <Box position="relative" bottom="0" width="100%" h="auto" bg="black">
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}
      >
        <Image src={logo} alt="footer-logo" h="70px" />

        <Text color="white" textAlign="center">
          Created by Saeed Kokash ©All rights reserved 2023
        </Text>

        <Box maxW="container.lg" mx="auto">
          <Stack
            direction={{ base: "column", md: "row" }}
            spacing={8}
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack direction="row" spacing={4} color="white">
              <Box as="a" href="https://www.linkedin.com/in/saeedkokash/" aria-label="Linkedin">
                <Icon as={FaLinkedin} boxSize={6} />
              </Box>
              <Box as="a" href="https://github.com/SaeedKokash" aria-label="Github">
                <Icon as={FaGithub} boxSize={6} />
              </Box>
              <Box as="a" href="https://wa.me/962795514411" aria-label="Whatsapp">
                <Icon as={FaWhatsapp} boxSize={6} />
              </Box>
            </Stack>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
