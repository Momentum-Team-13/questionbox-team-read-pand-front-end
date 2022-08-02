import './App.css'; 
// import { Link } from "react-router-dom";
// import dummy from './dummy-data.json'
import { Route, Routes } from "react-router-dom";
import Navbar from './components/navbar';
import Home from './home';
import Login from './login';
import Questions from './questions';
import ViewQuestion from './viewQuestion';
import useLocalStorageState from 'use-local-storage-state';

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
        <Route path="/questions" element={<Questions token={token} />} />
        <Route path="/question/:questionId" element={<ViewQuestion token={token} />} />
      </Routes>
    </>
  );
}

export default App;