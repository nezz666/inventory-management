import { HStack, Input, Button, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { useMemo } from "react";

export default function DateFilter({ startDate, endDate, onChange, onApply }) {
  // preset range helper
  const presets = useMemo(() => {
    const today = new Date();
    const pad = (d) => d.toISOString().slice(0, 10);
    const startOfWeek = new Date(today); startOfWeek.setDate(today.getDate() - today.getDay());
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    return {
      today: [pad(today), pad(today)],
      week: [pad(startOfWeek), pad(today)],
      month: [pad(startOfMonth), pad(today)],
    };
  }, []);

  const setPreset = (key) => {
    const [s, e] = presets[key];
    onChange({ startDate: s, endDate: e });
    onApply?.({ startDate: s, endDate: e });
  };

  return (
    <HStack spacing={3} flexWrap="wrap">
      <Input type="date" value={startDate} onChange={(e) => onChange({ startDate: e.target.value, endDate })} />
      <Input type="date" value={endDate} onChange={(e) => onChange({ startDate, endDate: e.target.value })} />
      <Button colorScheme="purple" onClick={() => onApply?.({ startDate, endDate })}>Terapkan</Button>
      <Menu>
        <MenuButton as={Button} variant="outline">Preset</MenuButton>
        <MenuList>
          <MenuItem onClick={() => setPreset("today")}>Hari Ini</MenuItem>
          <MenuItem onClick={() => setPreset("week")}>Minggu Ini</MenuItem>
          <MenuItem onClick={() => setPreset("month")}>Bulan Ini</MenuItem>
        </MenuList>
      </Menu>
    </HStack>
  );
}
