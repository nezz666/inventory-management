import { ChakraProvider, Container } from '@chakra-ui/react';
import { useState } from 'react';
import ItemForm from './components/ItemForm';
import ItemTable from './components/ItemTable';
import Login from './pages/Login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <ChakraProvider>
      <Container maxW="lg" mt={10}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Inventory Management</h1>
        <ItemForm />
        <ItemTable />
      </Container>
    </ChakraProvider>
  );
}

export default App;
