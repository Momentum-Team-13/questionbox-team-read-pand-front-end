import './App.css';
import axios from 'axios'
import { Route, Routes } from "react-router-dom";
import Navbar from './navbar';
import Home from './home';
import Login from './login';
import Questions from './questions';
import ViewQuestion from './viewQuestion';
import useLocalStorageState from 'use-local-storage-state';

function App() {
  const [token, setToken] = useLocalStorageState('gameToken', null)
  const [username, setUsername] = useLocalStorageState('gameUsername', '')

  const setAuth = (username, token) => {
    setToken(token)
    setUsername(username)
  }


    const handleLogout = () => {
      axios
        .post(
          'https://red-panda-question-box.herokuapp.com/api/auth/token/logout',
          {},
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        )
        .then(() =>
          setAuth('', null)
        )
    }
  const isLoggedIn = username && token
  

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} handleLogout = {handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/" element="" />
        <Route path="/" element="" />
        <Route path="/login" element={<Login setAuth={setAuth} isLoggedIn={isLoggedIn} />} />
        <Route path="/questions" element={<Questions token={token} />} />
        <Route path="/question/:questionId" element={<ViewQuestion token={token}/>} />
        {/* path="/question/:questionId" */}
      </Routes>
    </>
  );
}

export default App;
