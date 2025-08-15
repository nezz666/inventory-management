import { Box, Flex, Text, Stat, StatLabel, StatNumber, Badge } from "@chakra-ui/react";
import { ArrowUpCircle } from "lucide-react";

export default function OutgoingItemCard({ total = 0, delta = 0 }) {
  const up = delta >= 0;
  return (
    <Box bg="whiteAlpha.100" border="1px solid" borderColor="whiteAlpha.200"
         rounded="2xl" p={5} _hover={{ bg: "whiteAlpha.200" }}>
      <Flex align="center" justify="space-between" mb={2}>
        <Flex align="center" gap={2}>
          <ArrowUpCircle size={22} className="text-red-300" />
          <Text fontWeight="semibold" color="gray.300">Barang Keluar</Text>
        </Flex>
        <Badge colorScheme={up ? "green" : "red"} rounded="md">
          {up ? "▲" : "▼"} {Math.abs(delta)}%
        </Badge>
      </Flex>
      <Stat>
        <StatLabel color="gray.400">Total</StatLabel>
        <StatNumber color="white">{Number(total).toLocaleString("id-ID")}</StatNumber>
      </Stat>
    </Box>
  );
}
