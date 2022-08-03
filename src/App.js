import './App.css'; 
// import { Link } from "react-router-dom";
// import dummy from './dummy-data.json'
import { Route, Routes } from "react-router-dom";
import Navbar from './components/navbar';
import Home from './home';
import Login from './login';
import NewUser from './newUser';
import Questions from './questions';
import ViewQuestion from './viewQuestion';
import ViewCategory from './viewCategory';
import ViewGame from './viewGame';
import ViewUser from './viewUser';
import useLocalStorageState from 'use-local-storage-state';
import AskQuestion from './askQuestion';

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
        <Route path="/" element={<Home token={token} isLoggedIn={isLoggedIn} />} />
        <Route path="/" element="" />
        <Route path="/askquestion" element={<AskQuestion token={token} />} />
        <Route path="/new-user" element={<NewUser/>} />
        <Route path="/login" element={<Login setAuth={setAuth} isLoggedIn={isLoggedIn} />} />
        <Route path="/questions" element={<Questions token={token} isLoggedIn={isLoggedIn} />} />
        <Route path="/question/:questionId" element={<ViewQuestion token={token} isLoggedIn={isLoggedIn} />} />
        <Route path="/category/:categoryId" element={<ViewCategory token={token} isLoggedIn={isLoggedIn} />} />
        <Route path="/category/game/:gameId" element={<ViewGame token={token} isLoggedIn={isLoggedIn} />} />
        <Route path="/:userId" element={<ViewUser token={token} isLoggedIn={isLoggedIn} />} />
      </Routes>
    </>
  );
}

export default App;