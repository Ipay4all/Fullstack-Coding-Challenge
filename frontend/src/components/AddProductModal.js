import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Box,
  Checkbox,
  useToast,
} from "@chakra-ui/react";

import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../store/actions/productActions";

function AddProductModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const toast = useToast();

  const [product, setProduct] = useState({
    productId: 0,
    productName: "",
    global: false,
    senderFee: 0,
    senderFeePercentage: 0,
    discountPercentage: 0,
    denominationType: "FIXED",
    recipientCurrencyCode: "AED",
    minRecipientDenomination: "",
    maxRecipientDenomination: "",
    senderCurrencyCode: "USD",
    minSenderDenomination: "",
    maxSenderDenomination: "",
    fixedRecipientDenominations: [],
    fixedSenderDenominations: [],
    fixedRecipientToSenderDenominationsMap: {},
    logoUrls: [],
    brand: {
      brandId: 0,
      brandName: "",
    },
    country: {
      isoName: "",
      name: "",
      flagUrl: "",
    },
    redeemInstruction: {
      concise: "",
      verbose: "",
    },
  });

  //   const handlefixedRecipientToSenderDenominationsMapChange = (e) => {
  //     const { name, value } = e.target;
  //     setProduct((prevProduct) => ({
  //       ...prevProduct,
  //       fixedRecipientToSenderDenominationsMap: {
  //         ...prevProduct.fixedRecipientToSenderDenominationsMap,
  //         [name]: value,
  //       },
  //     }));
  //   };

  //   const handlefixedRecipientDenominationsChange = (e) => {
  //     const { name, value } = e.target;
  //     setProduct((prevProduct) => ({
  //       ...prevProduct,
  //       fixedRecipientDenominations: {
  //         ...prevProduct.fixedRecipientDenominations,
  //         [name]: value,
  //       },
  //     }));
  //   };

  //   const handlefixedSenderDenominationsChange = (e) => {
  //     const { name, value } = e.target;
  //     setProduct((prevProduct) => ({
  //       ...prevProduct,
  //       fixedSenderDenominations: {
  //         ...prevProduct.fixedSenderDenominations,
  //         [name]: value,
  //       },
  //     }));
  //   };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addProduct(dispatch, product, toast);
    onClose();

    setProduct({
      productId: 0,
      productName: "",
      global: false,
      senderFee: 0,
      senderFeePercentage: 0,
      discountPercentage: 0,
      denominationType: "FIXED",
      recipientCurrencyCode: "AED",
      minRecipientDenomination: "",
      maxRecipientDenomination: "",
      senderCurrencyCode: "USD",
      minSenderDenomination: "",
      maxSenderDenomination: "",
      fixedRecipientDenominations: [],
      fixedSenderDenominations: [],
      fixedRecipientToSenderDenominationsMap: {},
      logoUrls: [],
      brand: {
        brandId: 0,
        brandName: "",
      },
      country: {
        isoName: "",
        name: "",
        flagUrl: "",
      },
      redeemInstruction: {
        concise: "",
        verbose: "",
      },
    });
  };

  return (
    <Box w="100%" align="center">
      <Button
        onClick={onOpen}
        w="100%"
        bg="blue.200"
        _hover={{
          color: "white",
          bg: "blue.500",
        }}
        mt="1em"
      >
        Add Item
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="6xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Item</ModalHeader>
          <ModalCloseButton />

          <form onSubmit={(e) => handleSubmit(e)}>
            <ModalBody pb={6}>
              <Stack w="100%">
                <FormControl>
                  <FormLabel>Product ID</FormLabel>
                  <Input
                    placeholder="productId"
                    name="productId"
                    type="number"
                    value={product.productId}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Product Name</FormLabel>
                  <Input
                    placeholder="productName"
                    name="productName"
                    type="text"
                    value={product.productName}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Global</FormLabel>
                  <Checkbox name="global" value={product.global} onChange={handleChange}></Checkbox>
                </FormControl>

                <FormControl>
                  <FormLabel>Sender Fee</FormLabel>
                  <Input
                    placeholder="senderFee"
                    type="number"
                    name="senderFee"
                    value={product.senderFee}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Sender Fee Percentage</FormLabel>
                  <Input
                    placeholder="senderFeePercentage"
                    name="senderFeePercentage"
                    type="number"
                    value={product.senderFeePercentage}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Discount Percentage</FormLabel>
                  <Input
                    placeholder="discountPercentage"
                    name="discountPercentage"
                    type="number"
                    value={product.discountPercentage}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Denomination Type</FormLabel>
                  <Input
                    placeholder="denominationType"
                    name="denominationType"
                    type="text"
                    value={product.denominationType}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Recipient Currency Code</FormLabel>
                  <Input
                    placeholder="recipientCurrencyCode"
                    name="recipientCurrencyCode"
                    type="text"
                    value={product.recipientCurrencyCode}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Min Recipient Denomination</FormLabel>
                  <Input
                    placeholder="minRecipientDenomination"
                    name="minRecipientDenomination"
                    type="number"
                    value={product.minRecipientDenomination}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Max Recipient Denomination</FormLabel>
                  <Input
                    placeholder="maxRecipientDenomination"
                    name="maxRecipientDenomination"
                    type="number"
                    value={product.maxRecipientDenomination}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Sender Currency Code</FormLabel>
                  <Input
                    placeholder="senderCurrencyCode"
                    name="senderCurrencyCode"
                    type="text"
                    value={product.senderCurrencyCode}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Min Sender Denomination</FormLabel>
                  <Input
                    placeholder="minSenderDenomination"
                    name="minSenderDenomination"
                    type="number"
                    value={product.minSenderDenomination}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Max Sender Denomination</FormLabel>
                  <Input
                    placeholder="maxSenderDenomination"
                    name="maxSenderDenomination"
                    type="number"
                    value={product.maxSenderDenomination}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Fixed Recipient Denominations</FormLabel>
                  <Input
                    placeholder="fixedRecipientDenominations"
                    name="fixedRecipientDenominations"
                    type="number"
                    value={product.fixedRecipientDenominations}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Fixed Sender Denominations</FormLabel>
                  <Input
                    placeholder="fixedSenderDenominations"
                    name="fixedSenderDenominations"
                    type="number"
                    value={product.fixedSenderDenominations}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Fixed Recipient To Sender Denominations Map</FormLabel>
                  <Input
                    type="text"
                    placeholder="fixedRecipientToSenderDenominationsMap"
                    name="fixedRecipientToSenderDenominationsMap"
                    value={product.fixedRecipientToSenderDenominationsMap}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Logo Urls</FormLabel>
                  <Input
                    placeholder="logoUrls"
                    name="logoUrls"
                    type="text"
                    value={product.logoUrls}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Brand ID</FormLabel>
                  <Input
                    placeholder="brandId"
                    name="brandId"
                    type="number"
                    value={product.brand.brandId}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Brand Name</FormLabel>
                  <Input
                    placeholder="brandName"
                    name="brandName"
                    type="text"
                    value={product.brand.brandName}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Country ISO Name</FormLabel>
                  <Input
                    placeholder="countryIsoName"
                    name="countryIsoName"
                    type="text"
                    value={product.country.isoName}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Country Name</FormLabel>
                  <Input
                    placeholder="countryName"
                    name="countryName"
                    type="text"
                    value={product.country.name}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Country Flag URL</FormLabel>
                  <Input
                    placeholder="countryFlagUrl"
                    name="countryFlagUrl"
                    type="text"
                    value={product.country.flagUrl}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Redeem Instruction Concise</FormLabel>
                  <Input
                    placeholder="redeemInstructionConcise"
                    name="redeemInstructionConcise"
                    type="text"
                    value={product.redeemInstruction.concise}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Redeem Instruction Verbose</FormLabel>
                  <Input
                    placeholder="redeemInstructionVerbose"
                    name="redeemInstructionVerbose"
                    type="text"
                    value={product.redeemInstruction.verbose}
                    onChange={handleChange}
                  />
                </FormControl>
              </Stack>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} type="submit">
                Create
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default AddProductModal;
