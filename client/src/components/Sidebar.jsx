import { Box, VStack, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <Box
      w="220px"
      bg="gray.900"
      color="white"
      minH="100vh"
      p={4}
      boxShadow="md"
    >
      <VStack align="stretch" spacing={4}>
        <Button
          as={Link}
          to="/dashboard"
          variant="ghost"
          colorScheme="purple"
          justifyContent="flex-start"
        >
          Dashboard
        </Button>

        <Button
          as={Link}
          to="/barang"
          variant="ghost"
          colorScheme="purple"
          justifyContent="flex-start"
        >
          Barang
        </Button>

        <Button
          as={Link}
          to="/laporan"
          variant="ghost"
          colorScheme="purple"
          justifyContent="flex-start"
        >
          Laporan
        </Button>
      </VStack>
    </Box>
  );
}