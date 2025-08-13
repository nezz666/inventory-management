import { Input, Button, FormControl, FormLabel, VStack } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const Login = ({ setIsLoggedIn, setUsername }) => {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/login",
        {
          email: form.email,
          password: form.password
        },
        { withCredentials: true }
      );

      if (res.status === 200 && res.data.token) {
        Cookies.set("token", res.data.token, { expires: 7 });
        Cookies.set("username", res.data.username, { expires: 7 });

        setUsername(res.data.username);
        setIsLoggedIn(true);
      } else {
        alert("Login gagal: respons tidak sesuai");
      }
    } catch (err) {
      alert(err.response?.data?.msg || "Login gagal!");
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <VStack spacing={4}>
      <h2 className="text-2xl font-bold text-center">Login</h2>
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
      <Button colorScheme="purple" width="full" onClick={handleLogin}>
        Login
      </Button>
    </VStack>
  );
};

export default Login;
