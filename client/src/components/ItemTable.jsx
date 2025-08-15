import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button
} from "@chakra-ui/react";

const ItemTable = ({ items = [], onRefresh, onEdit, onDelete }) => {
  const handleDelete = async (id) => {
    if (window.confirm("Yakin hapus barang ini?")) {
      await onDelete(id);
      onRefresh();
    }
  };

  return (
    <Table variant="unstyled" colorScheme="purple">
      <Thead>
        <Tr>
          <Th>Nama</Th>
          <Th>Kategori</Th>
          <Th>Stok</Th>
          <Th>Aksi</Th>
        </Tr>
      </Thead>

      <Tbody>
        {items.length > 0 ? (
          items.map((item) => (
            <Tr key={item._id}>
              <Td>{item.name}</Td>
              <Td>{item.category}</Td>
              <Td>{item.stock}</Td>
              <Td>
                <Button
                  colorScheme="yellow"
                  size="sm"
                  mr={2}
                  onClick={() => onEdit(item)}
                >
                  Edit
                </Button>
                <Button
                  colorScheme="red"
                  size="sm"
                  onClick={() => handleDelete(item._id)}
                >
                  Hapus
                </Button>
              </Td>
            </Tr>
          ))
        ) : (
          <Tr>
            <Td colSpan={4} textAlign="center">
              Tidak ada data
            </Td>
          </Tr>
        )}
      </Tbody>
    </Table>
  );
};

export default ItemTable;
