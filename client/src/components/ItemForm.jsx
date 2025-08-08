import { useState } from 'react';
import { Input, Button, Stack } from '@chakra-ui/react';
import axios from 'axios';

export default function ItemForm() {
  const [item, setItem] = useState({ name: '', category: '', stock: 0 });

  const handleChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:5000/api/items', item);
      alert('Barang ditambahkan!');
      setItem({ name: '', category: '', stock: 0 });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Stack spacing={4}>
      <Input name="name" placeholder="Nama Barang" value={item.name} onChange={handleChange} />
      <Input name="category" placeholder="Kategori" value={item.category} onChange={handleChange} />
      <Input name="stock" type="number" placeholder="Stok Awal" value={item.stock} onChange={handleChange} />
      <Button colorScheme="teal" onClick={handleSubmit}>Tambah Barang</Button>
    </Stack>
  );
}
