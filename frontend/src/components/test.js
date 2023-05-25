<FormControl w="33%">
                  <FormLabel>Price</FormLabel>
                  <Input placeholder="Price $" name="price" value={price} onChange={(e) => setPrice(e.target.value)} />
                </FormControl>
              </Flex>

              <FormControl mt={4}>
                <FormLabel>Description</FormLabel>
                <Textarea
                  placeholder="Write a short description about the product"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FormControl>
              {/* Title, Desc, Price Section End */}

              <Center>
                <Divider m={10} borderColor="blue.100" borderWidth="1px" />
              </Center>

              {/* Specifications Section Start */}
              <VStack w="100%">
                <FormControl mt={4}>
                  <FormLabel>Specifications Table</FormLabel>
                  <List spacing={3} p="1.5" borderRadius="lg" boxShadow="lg">
                    {Object.keys(specifications).map((key, index) => (
                      <ListItem key={index} fontSize="sm">
                        <Flex w="100%" align="center">
                          <IconButton
                            type="button"
                            onClick={() => handleRemoveSpec(key)}
                            icon={<DeleteIcon />}
                            colorScheme="red"
                            size="xs"
                            mr={2}
                            borderRadius="full"
                          />
                          <Table variant="simple" size="sm">
                            <Thead>
                              <Tr w="100%">
                                <Td w="50%">{key}</Td>
                                <Td w="50%">{specifications[key]}</Td>
                              </Tr>
                            </Thead>
                          </Table>
                        </Flex>
                      </ListItem>
                    ))}
                  </List>
                </FormControl>

                <Flex w="100%" align="center" gap="2">
                  <FormControl mt={4}>
                    <FormLabel>Specifications Key</FormLabel>
                    <Input
                      placeholder="Specifications Key"
                      name="specKey"
                      value={specKey}
                      onChange={(e) => setSpecKey(e.target.value)}
                    />
                  </FormControl>

                  <FormControl mt={4}>
                    <FormLabel>Specifications Value</FormLabel>
                    <Input
                      placeholder="Specifications Value"
                      name="specValue"
                      value={specValue}
                      onChange={(e) => setSpecValue(e.target.value)}
                    />
                  </FormControl>

                  <Button type="button" onClick={handleSpecChange} mt={12} w="5%" colorScheme="teal">
                    Add
                  </Button>
                </Flex>
              </VStack>
              {/* Specifications Section End */}

              <Center>
                <Divider m={10} borderColor="blue.100" borderWidth="1px" />
              </Center>

              {/* List Section Start */}
              <VStack>
                <FormControl mt={4}>
                  <FormLabel>List</FormLabel>
                  <List borderRadius="lg" boxShadow="lg">
                    {list.map((item, index) => (
                      <ListItem key={index} fontSize="sm">
                        <IconButton
                          type="button"
                          onClick={() => handleRemoveListItem(index)}
                          icon={<DeleteIcon />}
                          colorScheme="red"
                          size="xs"
                          mr={2}
                          borderRadius="full"
                        />
                        {item}
                        <Divider mt="2" />
                      </ListItem>
                    ))}
                  </List>
                </FormControl>

                <Flex w="100%" gap="2">
                  <FormControl mt={4}>
                    <FormLabel>List Item</FormLabel>
                    <Input
                      placeholder="List Item"
                      name="listItem"
                      value={listItem}
                      onChange={(e) => setListItem(e.target.value)}
                    />
                  </FormControl>

                  <Button type="button" onClick={handleListChange} mt={12} w="4%" colorScheme="teal">
                    Add
                  </Button>
                </Flex>
              </VStack>
              {/* List Section End */}

              <Center>
                <Divider m={10} borderColor="blue.100" borderWidth="1px" />
              </Center>

              {/* Images Section Start */}
              <FormControl pb="1em">
                <FormLabel>Upload Images</FormLabel>
                <Input
                  type="file"
                  accept="image/*"
                  name="itemImage"
                  multiple="multiple"
                  placeholder="itemImage"
                  variant="auth"
                  m="4px"
                  w="100%"
                  onChange={(e) => validateImage(e)}
                />

                <FormHelperText textAlign="left" m="4px" w="100%">
                  You can upload up to 8 images.
                </FormHelperText>
              </FormControl>

              {previewImage && previewImage.length > 0 && (
                <Flex wrap="wrap" spacing="6" rounded="lg" shadow="md" bg="blue.100" p="4">
                  {previewImage &&
                    previewImage.map((image, index) => (
                      <Box>
                        <Image
                          key={index}
                          src={image}
                          alt="preview"
                          w="120px"
                          h="120px"
                          m="4px"
                          borderRadius="full"
                          objectFit="cover"
                          boxShadow="md"
                        />

                        <IconButton
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          icon={<DeleteIcon />}
                          colorScheme="red"
                          mr={2}
                          size="xs"
                          borderRadius="full"
                        />
                      </Box>
                    ))}

                  <Spacer />
                  <IconButton
                    type="button"
                    onClick={handleRemoveAllImages}
                    icon={<SmallCloseIcon />}
                    colorScheme="red"
                    size="xs"
                    mr={2}
                    borderRadius="full"
                  />
                </Flex>
              )}
              {/* Images Section End */}

              <Center>
                <Divider m={10} borderColor="blue.100" borderWidth="1px" />
              </Center>

              {/* Video Section Start */}
              <FormControl mt={4}>
                <FormLabel>Video</FormLabel>
                <Input
                  type="file"
                  accept="video/*"
                  name="video"
                  multiple="multiple"
                  placeholder="video"
                  variant="auth"
                  m="4px"
                  w="100%"
                  onChange={(e) => validateVideo(e)}
                />
                <FormHelperText textAlign="left" m="4px" w="100%">
                  Maximum size is 50MB per video, and you can upload up to 3 videos.
                  <br />
                  If you wish to remove one video, click the remove video button.
                  <br />
                  If you wish to remove all the videos, click Choose File then click Cancel.
                </FormHelperText>
                <Button type="button" onClick={handleRemoveVideo} mt={4} w="100%" colorScheme="red">
                  Remove Video
                </Button>
              </FormControl>