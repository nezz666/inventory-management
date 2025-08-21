import { useState } from "react";
import axios from "axios";
import {
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Select,
  Input,
  useColorModeValue,
  Box,
  VStack,
  HStack,
  Text,
  Divider,
} from "@chakra-ui/react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

const Laporan = () => {
  const [type, setType] = useState("Barang Masuk");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [data, setData] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);

  const handleSearch = async () => {
  try {
    console.log("🔎 Searching with params:", { type, startDate, endDate });

    const params = {};
    if (type) params.type = type;
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;

    const res = await axios.get("http://localhost:5000/api/laporan", { params });

    console.log("✅ Response data:", res.data);
    setData(res.data);

    // Hitung total jumlah
    const total = res.data.reduce((acc, item) => acc + (item.jumlah || 0), 0);
    setTotalQuantity(total);
  } catch (error) {
    console.error("❌ Error ambil data laporan:", error.response || error.message);
    alert("Gagal mengambil data laporan: " + (error.response?.data?.message || error.message));
  }
};


  return (
    <Box
      p={6}
      minH="100vh"
      bg={useColorModeValue("gray.100", "gray.900")}
      display="flex"
      justifyContent="center"
      alignItems="flex-start"
    >
      <Card className="w-full max-w-5xl shadow-xl backdrop-blur-lg bg-opacity-30">
        <CardHeader>
          <Text fontSize="2xl" fontWeight="bold" textAlign="center">
            Laporan Barang
            
          </Text>
        </CardHeader>
        <CardContent>
          <VStack spacing={4} align="stretch">
            {/* Filter */}
            <HStack spacing={4}>
              <Select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="Barang Masuk">Barang Masuk</option>
              <option value="Barang Keluar">Barang Keluar</option>
              </Select>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />

              <Button colorScheme="purple" onClick={handleSearch}>
                Cari
              </Button>
            </HStack>

            <Divider />

            {/* Info Total */}
            <Box
              p={4}
              borderRadius="lg"
              bg={useColorModeValue("purple.50", "purple.900")}
              textAlign="center"
            >
              <Text fontSize="lg" fontWeight="semibold">
                Total Quantity:{" "}
                <span style={{ color: "#815ad5ff", fontWeight: "bold" }}>
                  {totalQuantity}
                </span>
              </Text>
            </Box>

            {/* Tabel */}
            <Table variant="simple" size="md">
              <Thead>
                <Tr>
                  <Th>Nama Barang</Th>
                  <Th>Jumlah</Th>
                  <Th>Tanggal</Th>
                </Tr>
              </Thead>
              <Tbody>
              {data.length > 0 ? (
              data.map((item) => (
              <Tr key={item._id}>
              <Td>{item.namaBarang}</Td>
              <Td>{item.jumlah}</Td>
              <Td>{new Date(item.tanggal).toLocaleDateString()}</Td>
              </Tr>
              ))
              ) : (
              <Tr>
              <Td colSpan="3" style={{ textAlign: "center" }}>
              Tidak ada data
              </Td>
              </Tr>
              )}
              </Tbody>
            </Table>
          </VStack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Laporan;
