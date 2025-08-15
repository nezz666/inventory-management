import { Box, Text, Flex, useColorModeValue } from "@chakra-ui/react";

export default function StatsCard({ title, value, color }) {
  return (
    <Box
      bg={useColorModeValue("white", "gray.800")}
      borderRadius="xl"
      boxShadow="md"
      p={6}
      w="full"
    >
      <Flex direction="column" align="flex-start">
        <Text fontSize="lg" fontWeight="medium" color="gray.500">
          {title}
        </Text>
        <Text fontSize="3xl" fontWeight="bold" color={color}>
          {value}
        </Text>
      </Flex>
    </Box>
  );
}
