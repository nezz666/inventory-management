import { Input, Button, FormControl, FormLabel, VStack } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const handleRegister = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/register", form);
      alert(`Registrasi sukses untuk ${res.data.username}`);
    } catch (err) {
      alert("Registrasi gagal!");
    }
  };

  return (
    <VStack spacing={4}>
      <h2 className="text-2xl font-bold text-center">Register</h2>
      <FormControl>
        <FormLabel>Username</FormLabel>
        <Input
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
      </FormControl>
      <Button colorScheme="purple" width="full" onClick={handleRegister}>
        Register
      </Button>
    </VStack>
  );
};

export default Register;
