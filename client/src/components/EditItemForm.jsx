import React, { useState, useEffect } from "react";
import { Box, Button, FormControl, FormLabel, Input, VStack, Heading, HStack } from "@chakra-ui/react";

const EditItemForm = ({ item, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    stock: ""
  });

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name || "",
        category: item.category || "",
        stock: item.stock || ""
      });
    }
  }, [item]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onUpdate) {
      onUpdate({
        name: formData.name,
        category: formData.category,
        stock: formData.stock
      });
    }
  };

  return (
    <Box
      bg="gray.800"
      p={6}
      rounded="lg"
      shadow="lg"
      w="100%"
      maxW="400px"
      mx="auto"
    >
      <Heading size="md" color="white" mb={4} textAlign="center">
        Edit Item
      </Heading>

      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl>
            <FormLabel color="white">Nama Barang</FormLabel>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              bg="gray.700"
              color="white"
              border="none"
              dropShadow={"0 4px 32px 0 rgba(128,0,255,0.4), 0 1.5px 8px 0 rgba(128,0,255,0.7)"}
              _focus={{ bg: "gray.600" }}
            />
          </FormControl>

          <FormControl>
            <FormLabel color="white">Kategori</FormLabel>
            <Input
              name="category"
              value={formData.category}
              onChange={handleChange}
              bg="gray.700"
              color="white"
              border="none"
              _focus={{ bg: "gray.600" }}
            />
          </FormControl>

          <FormControl>
            <FormLabel color="white">Stok</FormLabel>
            <Input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              bg="gray.700"
              color="white"
              border="none"
              _focus={{ bg: "gray.600" }}
            />
          </FormControl>

          <HStack w="100%" spacing={3} mt={4}>
            <Button type="submit" colorScheme="yellow" w="full">
              Simpan
            </Button>
            <Button type="button" colorScheme="red" w="full" onClick={onCancel}>
              Batal
            </Button>
          </HStack>
        </VStack>
      </form>
    </Box>
  );
};

export default EditItemForm;
