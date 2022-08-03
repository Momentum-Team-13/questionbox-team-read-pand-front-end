import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import useLocalStorageState from 'use-local-storage-state'
import axios from 'axios'

export default function Navbar() {
    const [token, setToken] = useLocalStorageState('libraryToken', null)
    const [username, setUsername] = useLocalStorageState('libraryUsername', '')
    const [user, setUser] = useState([]);

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

      useEffect(() => {
        axios
            .get(`https://red-panda-question-box.herokuapp.com/api/auth/users`,
            { headers: {
                Authorization: `Token ${token}`,
              },
    })
            .then((res) => {
                setUser(res.data);
                console.log(res.data)
            });
    }, [token]);

      const isLoggedIn = username && token

    return (
        <>
            <div className="nav">
            <div className="nav-logo">
                            <img src="../images/branding/logo.png" alt="gitgud logo" />
                        </div>
                <div className="nav-content">
                    <div className="nav-items">
                    
                          <Link to={"/"}><div className="nav-item">
                          Home
                        </div></Link>
                        {user.length > 0 && 
                         <Link to={`/${user[0].id}`}><div className="nav-item">
                           User Profile
                        </div></Link>}

                        <Link to={"/"}> <div className="nav-item">
                           Ask a Question
                        </div></Link>

                        <Link to={"/questions"}>
                        <div className="nav-item">
                           Questions (Temp)
                        </div>
                        </Link>
                        <Link to={"/viewquestion"}>
                        <div className="nav-item">
                            View Question
                        </div></Link>
                        {!isLoggedIn && <Link to={"/login"}>
                        <div className="nav-item login">
                        Login
                        </div>
                        </Link>}
                        {isLoggedIn && 
                        <div className="nav-item login" onClick={() => {handleLogout()}}>
                        Logout
                        </div>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}