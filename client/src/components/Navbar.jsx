import { Box, Flex, Button, Text } from "@chakra-ui/react";

export default function Navbar({ username, onToggleSidebar, onLogout }) {
  return (
    <Flex as="nav" align="center" justify="space-between" p={4} bg="purple.700" color="white">
      <Button onClick={onToggleSidebar} colorScheme="purple" variant="outline">
        ☰
      </Button>
      <Box>
        <Text fontWeight="bold">Inventory Management</Text>
      </Box>
      <Flex align="center" gap={3}>
        <Text>Hi, {username}</Text>
        <Button colorScheme="red" size="sm" onClick={onLogout}>
          Logout
        </Button>
      </Flex>
    </Flex>
  );
}
