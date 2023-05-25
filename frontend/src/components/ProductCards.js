import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Heading,
  Text,
  Divider,
  Button,
  Center,
  Flex,
  Box,
  Spacer,
  VStack,
} from "@chakra-ui/react";
import { useEffect } from "react";
import AddProductModal from "./AddProductModal";
import EditProductModal from "./EditProductModal";
import ClearAllProductsModal from "./ClearAllProductsModal";

import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProduct, getOriginalProducts } from "../store/actions/productActions";

export default function ProductCards() {
  const { products, loading } = useSelector((state) => state.product);
  const { token } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const bg = "blue.300";
  const color = "white.100";
  const cardBg = "gray.200";

  useEffect(() => {
    // window.scrollTo(0, 0);
    document.title = "Products | iPay";
  }, [products, dispatch]);

  return (
    <Box p="0" minH="80vh">
      <Center p="3em">
        <Heading>Our Products</Heading>
      </Center>

      <Center>
        <Divider borderWidth="1px" w="66%" borderColor="grey.100" />
      </Center>

      {token ? (
        <Flex justify="space-between" p="3em" w="100%" align="center">
          <VStack w="50%" align="center" justify="center" m="auto">
          <AddProductModal />

            { loading ? (
              
            <Button
              w="100%"
              bg="green.200"
              _hover={{
                color: "white",
                bg: "green.500",
              }}
              onClick={() => getOriginalProducts(dispatch)}
              isLoading
            >
              Get All Original Products
            </Button>
            ) : (
              <Button
              w="100%"
              bg="green.200"
              _hover={{
                color: "white",
                bg: "green.500",
              }}
              onClick={() => getOriginalProducts(dispatch)}
            >
              Get All Original Products
            </Button>
            )}

            <ClearAllProductsModal />
          </VStack>
        </Flex>
      ) : null}

      <Flex gap="3" flexWrap="wrap" justify="center" py="3em">
        {products ? (
          products.map((product) => (
            <Card
              key={product._id}
              w={{ base: "45%", md: "300px" }}
              h={{ base: "100%", md: "500px" }}
              bg={cardBg}
              borderRadius="2xl"
              boxShadow="md"
              overflow="hidden"
              _hover={{
                boxShadow: "2xl",
              }}
            >
              <Link to={`/product/${product.productName.replace(/\s+/g, "-").toLowerCase()}`}>
                <CardBody h="100%" cursor="pointer">
                  <Image
                    src={product.logoUrls[0]}
                    alt={product.title}
                    borderRadius="xl"
                    w="100%"
                    h={{ base: "100%", sm: "260px" }}
                    objectFit="contain"
                    _hover={{
                      transform: "scale(1.05)",
                      transition: "transform 0.5s",
                    }}
                  />
                  <VStack
                    mt={{ base: "0.5em", md: "1.5em" }}
                    h="100px"
                    justifyContent="space-between"
                    textAlign="center"
                  >
                    <Heading size={{ base: "sm", md: "md" }} color="black">
                      {product.productName}
                    </Heading>

                    <Text color={bg} fontWeight="bold" fontSize="lg">
                      {product.fixedRecipientDenominations.length > 0
                        ? "AED " +
                          product.fixedRecipientDenominations[0] +
                          "-" +
                          product.fixedRecipientDenominations[product.fixedRecipientDenominations.length - 1]
                        : "Not Available"}
                    </Text>
                  </VStack>
                </CardBody>
              </Link>

              <Spacer />
              <Divider color={bg} w="80%" alignSelf="center" />

              <CardFooter>
                {token ? (
                  <Flex w="100%" gap="1em">
                    <EditProductModal Originalproduct={product} />
                    <Button
                      w="100%"
                      bg="red.200"
                      _hover={{
                        color: "black",
                        bg: "red.500",
                      }}
                      onClick={() => deleteProduct(dispatch, product._id)}
                    >
                      Delete
                    </Button>
                  </Flex>
                ) : (
                  <Button
                    w="100%"
                    color={color}
                    bg={bg}
                    _hover={{
                      bg: "white.100",
                      color: bg,
                      border: "1px",
                      borderColor: bg,
                    }}
                  >
                    Add to Cart
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))
        ) : (
          <Center>
            <Heading>No products</Heading>
          </Center>
        )}
      </Flex>
    </Box>
  );
}
