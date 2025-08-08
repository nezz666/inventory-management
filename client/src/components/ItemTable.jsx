import { useEffect, useState } from 'react';
import {
  Table, Thead, Tbody, Tr, Th, Td, Button, Input, Stack,
} from '@chakra-ui/react';
import axios from 'axios';

export default function ItemTable() {
  const [items, setItems] = useState([]);
  const [editItemId, setEditItemId] = useState(null);
  const [editData, setEditData] = useState({ name: '', category: '', stock: 0 });

  const fetchItems = async () => {
    const res = await axios.get('http://localhost:5000/api/items');
    setItems(res.data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const deleteItem = async (id) => {
    await axios.delete(`http://localhost:5000/api/items/${id}`);
    fetchItems();
  };

  const startEdit = (item) => {
    setEditItemId(item._id);
    setEditData({ name: item.name, category: item.category, stock: item.stock });
  };

  const cancelEdit = () => {
    setEditItemId(null);
    setEditData({ name: '', category: '', stock: 0 });
  };

  const saveEdit = async () => {
    await axios.put(`http://localhost:5000/api/items/${editItemId}`, editData);
    setEditItemId(null);
    fetchItems();
  };

  return (
    <Table variant="simple" mt={8}>
      <Thead>
        <Tr>
          <Th>Nama</Th>
          <Th>Kategori</Th>
          <Th>Stok</Th>
          <Th>Aksi</Th>
        </Tr>
      </Thead>
      <Tbody>
        {items.map((item) => (
          <Tr key={item._id}>
            {editItemId === item._id ? (
              <>
                <Td><Input value={editData.name} onChange={(e) => setEditData({ ...editData, name: e.target.value })} /></Td>
                <Td><Input value={editData.category} onChange={(e) => setEditData({ ...editData, category: e.target.value })} /></Td>
                <Td><Input type="number" value={editData.stock} onChange={(e) => setEditData({ ...editData, stock: parseInt(e.target.value) })} /></Td>
                <Td>
                  <Stack direction="row">
                    <Button colorScheme="green" size="sm" onClick={saveEdit}>Simpan</Button>
                    <Button colorScheme="gray" size="sm" onClick={cancelEdit}>Batal</Button>
                  </Stack>
                </Td>
              </>
            ) : (
              <>
                <Td>{item.name}</Td>
                <Td>{item.category}</Td>
                <Td>{item.stock}</Td>
                <Td>
                  <Stack direction="row">
                    <Button colorScheme="blue" size="sm" onClick={() => startEdit(item)}>Edit</Button>
                    <Button colorScheme="red" size="sm" onClick={() => deleteItem(item._id)}>Hapus</Button>
                  </Stack>
                </Td>
              </>
            )}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
