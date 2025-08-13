import { useState } from "react";
import { Button, Input, FormControl, FormLabel, VStack } from "@chakra-ui/react";
import Cookies from "js-cookie";
import api from "../api";

const ItemForm = ({ onAddSuccess }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");

  const handleSubmit = async () => {
    if (!name || !category || !stock) {
      alert("Semua field harus diisi");
      return;
    }

    try {
      const token = Cookies.get("token"); // Ambil token dari cookies
      await api.post(
        "/items",
        { name, category, stock },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Reset form
      setName("");
      setCategory("");
      setStock("");

      if (onAddSuccess) onAddSuccess(); // refresh tabel
      alert("Barang berhasil ditambahkan");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Gagal menambah barang");
    }
  };

  return (
    <VStack spacing={3} align="stretch" mb={4}>
      <FormControl>
        <FormLabel>Nama Barang</FormLabel>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </FormControl>
      <FormControl>
        <FormLabel>Kategori</FormLabel>
        <Input value={category} onChange={(e) => setCategory(e.target.value)} />
      </FormControl>
      <FormControl>
        <FormLabel>Stok</FormLabel>
        <Input
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
      </FormControl>
      <Button colorScheme="purple" onClick={handleSubmit}>
        Tambah Barang
      </Button>
    </VStack>
  );
};

export default ItemForm;
