import './App.css';
// import { Link } from "react-router-dom";
// import dummy from './dummy-data.json'
import { Route, Routes } from "react-router-dom";
import Navbar from './navbar';
import Home from './home';
import Login from './login'
import useLocalStorageState from 'use-local-storage-state'

function App() {
  const [token, setToken] = useLocalStorageState('libraryToken', null)
  const [username, setUsername] = useLocalStorageState('libraryUsername', '')

  const setAuth = (username, token) => {
    setToken(token)
    setUsername(username)
  }
  const isLoggedIn = username && token
  

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/" element="" />
        <Route path="/" element="" />
        <Route path="/login" element={<Login setAuth={setAuth} isLoggedIn={isLoggedIn} />} />
      </Routes>
    </>
  );
}

export default App;
