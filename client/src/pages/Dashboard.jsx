import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "../api"; // kalau api.js export default axios instance
import Cookies from "js-cookie";

import IncomingItemCard from "../components/dashboard/IncomingItemCard";
import OutgoingItemCard from "../components/dashboard/OutgoingItemCard";
import SalesChart from "../components/dashboard/SalesChart";
import DateFilter from "../components/dashboard/DateFilter";

export default function Dashboard() {
  const [summary, setSummary] = useState({
    masuk: 0,
    keluar: 0,
    deltaMasuk: 0,
    deltaKeluar: 0,
    totalTransaksi: 0,
  });
  const [series, setSeries] = useState([]);
  const [range, setRange] = useState({
    startDate: new Date(Date.now() - 6 * 86400000)
      .toISOString()
      .slice(0, 10),
    endDate: new Date().toISOString().slice(0, 10),
  });

  const headers = { Authorization: `Bearer ${Cookies.get("token")}` };

  const load = async () => {
    try {
      const [s, r] = await Promise.all([
        axios.get("/dashboard/summary", { params: range, headers }),
        axios.get("/dashboard/series", { params: range, headers }),
      ]);

      // summary langsung dipakai
      setSummary(s.data.data || s.data);

      // normalisasi data series untuk chart
      const rawSeries = r.data.data || r.data;
      const mapped = rawSeries.map((item) => ({
        date: item.date || item.tanggal || "", // fleksibel ambil field tanggal
        masuk: item.masuk ?? item.totalMasuk ?? 0,
        keluar: item.keluar ?? item.totalKeluar ?? 0,
      }));

      console.log("series (mapped):", mapped); // cek hasil
      setSeries(mapped);      
    } catch (err) {
      console.error("Gagal load dashboard:", err);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      <Heading mb={4}>Dashboard</Heading>

      {/* Filter tanggal */}
      <Box mb={4}>
        <DateFilter
          startDate={range.startDate}
          endDate={range.endDate}
          onChange={(v) => setRange((prev) => ({ ...prev, ...v }))}
          onApply={load}
        />
      </Box>

      {/* Kartu ringkasan */}
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={4}>
        <IncomingItemCard total={summary.masuk} delta={summary.deltaMasuk} />
        <OutgoingItemCard total={summary.keluar} delta={summary.deltaKeluar} />
      </SimpleGrid>

      {/* Grafik tren */}
      <SalesChart data={series} />
    </Box>
  );
}
