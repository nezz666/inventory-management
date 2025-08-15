import { Box, Text } from "@chakra-ui/react";
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";

/**
 * props:
 *  data: [{ date: "2025-08-13", masuk: 10, keluar: 5 }, ...]
 */
export default function SalesChart({ data = [] }) {
  return (
    <Box bg="whiteAlpha.100" border="1px solid" borderColor="whiteAlpha.200" rounded="2xl" p={4}>
      <Text mb={3} fontWeight="semibold" color="gray.300">Tren Harian</Text>
      <Box h="320px">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#5555" />
            <XAxis dataKey="date" tick={{ fill: "#a1a1aa" }} />
            <YAxis tick={{ fill: "#a1a1aa" }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="masuk" stroke="#22c55e" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="keluar" stroke="#ef4444" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}
