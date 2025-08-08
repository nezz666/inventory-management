import { useState } from 'react';
import { Input, Button, Box, Heading, useToast } from '@chakra-ui/react';
import axios from 'axios';

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ username: '', password: '' });
  const toast = useToast();

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/login', form);
      localStorage.setItem('token', res.data.token);
      toast({ title: 'Login berhasil', status: 'success' });
      onLogin(); // redirect
    } catch (err) {
      toast({ title: 'Login gagal', description: err.response?.data?.msg, status: 'error' });
    }
  };

  return (
    <Box maxW="sm" mx="auto" mt="20">
      <Heading mb="6">Admin Login</Heading>
      <Input placeholder="Username" mb="3" onChange={(e) => setForm({ ...form, username: e.target.value })} />
      <Input placeholder="Password" type="password" mb="3" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <Button colorScheme="blue" onClick={handleLogin}>Login</Button>
    </Box>
  );
}
