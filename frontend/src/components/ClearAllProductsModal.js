import {
    Button,
    FormControl,
    FormLabel,
    Input,
    useDisclosure,
    useToast,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Text,
  } from "@chakra-ui/react";
  import React, { useState } from "react";
  import { useDispatch } from "react-redux";
  import { dropDB } from "../store/actions/productActions";
  
  function ClearAllProductsModal() {
    const [password, setPassword] = useState("");
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const dispatch = useDispatch();
  
    const HandleDelete = (e) => {
      e.preventDefault();

      if (password === process.env.REACT_APP_PASSWORD) {
        dropDB(dispatch, password, toast, onClose());
      } else {
        onClose();
        toast({
          title: "Wrong Password",
          description: "You have entered the wrong password",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };
  
    return (
      <>
        <Button onClick={onOpen} w="100%"
              bg="red.200"
              _hover={{
                color: "white",
                bg: "red.500",
              }}>
                Clear Database
        </Button>
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Clear Database</ModalHeader>
  
            <ModalCloseButton />
            <form 
            onSubmit={(e) => {HandleDelete(e)}}
            >
              <ModalBody pb={6}>
                <Text>Are you sure you want to clear Database?</Text>
  
                <FormControl isRequired>
                  <FormLabel>Enter Password to DELETE!</FormLabel>
                  <Input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
                </FormControl>
              </ModalBody>
  
              <ModalFooter>
                <Button colorScheme="red" mr={3} type="submit">
                  Delete
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      </>
    );
  }
  
  export default ClearAllProductsModal;