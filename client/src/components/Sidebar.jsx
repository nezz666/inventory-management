import { Box, VStack, Button } from "@chakra-ui/react";

export default function Sidebar() {
  return (
    <Box w="220px" bg="gray.900" color="white" minH="100vh" p={4} boxShadow="md">
      <VStack align="stretch" spacing={4}>
        <Button variant="ghost" colorScheme="purple" justifyContent="flex-start">
          Dashboard
        </Button>
        <Button variant="ghost" colorScheme="purple" justifyContent="flex-start">
          Barang
        </Button>
        <Button variant="ghost" colorScheme="purple" justifyContent="flex-start">
          Laporan
        </Button>
      </VStack>
    </Box>
  );
}
