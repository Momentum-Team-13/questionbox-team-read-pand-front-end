import { Link } from "react-router-dom";
import useLocalStorageState from 'use-local-storage-state'
import axios from 'axios'

export default function Navbar() {
    const [token, setToken] = useLocalStorageState('libraryToken', null)
    const [username, setUsername] = useLocalStorageState('libraryUsername', '')

    const setAuth = (username, token) => {
        setToken(token)
        setUsername(username)
      }
      const handleLogout = () => {
        axios
          .post(
            'https://red-panda-question-box.herokuapp.com/api/auth/token/logout/',
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
            <div className="nav">
            <div className="nav-logo">
                            <img src="../images/branding/logo.png" alt="gitgud logo" />
                        </div>
                <div className="nav-content">
                    <div className="nav-items">
                    
                        <div className="nav-item">
                            <Link to={"/"}>Home</Link>
                        </div>
                        <div className="nav-item">
                            <Link to={"/"}>User Profile</Link>
                        </div>

                        <div className="nav-item">
                            <Link to={"/askquestion"}>Ask a Question</Link>
                        </div>
                       
                        <div className="nav-item login">
                        <Link to={"/login"}>{isLoggedIn && <div onClick={() => {handleLogout()}}>Logout</div>} {!isLoggedIn && "Login"}</Link>
                        </div>
                        <div className="nav-item">
                            <Link to={"/questions"}>Questions (Temp)</Link>
                        </div>
                        <div className="nav-item">
                            <Link to={"/viewquestion"}>View Question</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}