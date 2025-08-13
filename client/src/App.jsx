import { useState, useEffect } from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ItemForm from './components/ItemForm';
import ItemTable from './components/ItemTable';
import Cookies from "js-cookie";
import axios from "axios";

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
});

function App() {
  const [showLogin, setShowLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const savedUsername = Cookies.get("username");
    const token = Cookies.get("token");
    if (savedUsername && token) {
      setUsername(savedUsername);
      setIsLoggedIn(true);
      fetchItems(token); // langsung fetch kalau sudah login
    }
  }, []);

  const fetchItems = async (token) => {
    try {
      const res = await axios.get("http://localhost:5000/api/items", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setItems(res.data);
    } catch (err) {
      console.error("Gagal mengambil data:", err);
    }
  };

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const handleLogout = () => {
    Cookies.remove("username");
    Cookies.remove("token");
    setIsLoggedIn(false);
    setUsername("");
  };

  return (
    <ChakraProvider theme={theme}>
      {!isLoggedIn ? (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#18181b",
            color: "#fff",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: 400,
              padding: 24,
              borderRadius: 16,
              boxShadow: "0 4px 32px #0004",
              background: "#23232b99",
              backdropFilter: "blur(8px)",
            }}
          >
            {showLogin ? (
              <Login setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />
            ) : (
              <Register setShowLogin={setShowLogin} />
            )}
            <button
              onClick={() => setShowLogin(!showLogin)}
              style={{
                marginTop: 16,
                width: "100%",
                fontSize: 14,
                color: "#ccc",
                background: "none",
                border: "none",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              {showLogin
                ? "Belum punya akun? Register"
                : "Sudah punya akun? Login"}
            </button>
          </div>
        </div>
      ) : (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            background: "#18181b",
            color: "#fff",
          }}
        >
          <Navbar
            username={username}
            onToggleSidebar={toggleSidebar}
            onLogout={handleLogout}
          />
          <div style={{ display: "flex", flex: 1 }}>
            {isSidebarOpen && <Sidebar />}
            <main style={{ flex: 1, padding: 24 }}>
              <h1 style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>
                Inventory Management
              </h1>
              <p style={{ marginBottom: 16 }}>
                Selamat datang, <b>{username}</b>!
              </p>
              <ItemForm onAddSuccess={() => fetchItems(Cookies.get("token"))} />
              <ItemTable
                items={items}
                onRefresh={() => fetchItems(Cookies.get("token"))}
                onDelete={async (id) => {
                  try {
                    await axios.delete(`http://localhost:5000/api/items/${id}`, {
                      headers: {
                        Authorization: `Bearer ${Cookies.get("token")}`,
                      },
                    });
                    fetchItems(Cookies.get("token"));
                  } catch (err) {
                    alert("Gagal menghapus item");
                  }
                }}
              />
            </main>
          </div>
        </div>
      )}
    </ChakraProvider>
  );
}

export default App;
