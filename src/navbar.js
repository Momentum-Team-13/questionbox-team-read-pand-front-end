import { Link } from "react-router-dom";

export default function Navbar() {
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
                        <div className="nav-item">
                            <Link to={"/login"}>Login/Sign Up</Link>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}
