import { Link } from "react-router-dom";


export default function Navbar({handleLogout}, {isLoggedIn}) {

      
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
                            <Link to={"/"}>Ask a Question</Link>
                        </div>
                        {!isLoggedIn ? (<div onClick={() => {handleLogout()}} className="nav-item login">
                        Logout
                        </div>) : (<Link to={"/login"}> 
                        <div className="nav-item login">
                        Login
                        </div></Link> ) }
                    
                         <Link to={"/questions"}><div className="nav-item">
                           Questions (Temp)
                        </div></Link>
                         <Link to={"/viewquestion"}><div className="nav-item">
                           View Question
                        </div></Link>
                    </div>
                </div>
            </div>
        </>
    );
}
