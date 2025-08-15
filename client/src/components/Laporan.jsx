import { useState } from "react";
import axios from "axios";
import {
  Box,
  Heading,
  Select,
  Input,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useColorModeValue
} from "@chakra-ui/react";

export default function Laporan() {
  const [type, setType] = useState("masuk");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [data, setData] = useState([]);

  const bgCard = useColorModeValue("whiteAlpha.800", "gray.800");
  const borderColor = useColorModeValue("purple.300", "purple.600");

  const handleSearch = async () => {
    try {
      const res = await axios.get("/api/reports", {
        params: { type, startDate, endDate },
      });
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box p={5}>
      <Heading size="lg" mb={4}>
        Laporan
      </Heading>

      {/* Filter Form */}
      <Box
        p={4}
        bg={bgCard}
        borderRadius="xl"
        border="1px solid"
        borderColor={borderColor}
        mb={6}
      >
        <Select value={type} onChange={(e) => setType(e.target.value)} mb={3}>
          <option value="masuk">Barang Masuk</option>
          <option value="keluar">Barang Keluar</option>
        </Select>

        <Input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          mb={3}
        />
        <Input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          mb={3}
        />

        <Button colorScheme="purple" w="full" onClick={handleSearch}>
          Cari
        </Button>
      </Box>

      {/* Tabel Laporan */}
      <Table variant="simple" colorScheme="purple">
        <Thead>
          <Tr>
            <Th>Nama Barang</Th>
            <Th>Jumlah</Th>
            <Th>Tanggal</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.length > 0 ? (
            data.map((item, i) => (
              <Tr key={i}>
                <Td>{item.itemId?.name || "-"}</Td>
                <Td>{item.quantity}</Td>
                <Td>
                  {item.date
                    ? new Date(item.date).toLocaleDateString()
                    : "-"}
                </Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan="3" textAlign="center">
                Tidak ada data
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </Box>
  );
}
