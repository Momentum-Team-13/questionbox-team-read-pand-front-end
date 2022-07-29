import { Link } from "react-router-dom";
import './navbar.css';

export default function Navbar() {
    return (
        <>
            <div className="nav">
                <div className="nav-content">
                    <ul className="nav-items">
                        <li className="nav-item">
                            <Link to={"/"}>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/"}>User Question Page</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/"}>Ask a Question</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/login"}>Login/Sign Up</Link>
                        </li>

                    </ul>
                </div>
            </div>
        </>
    );
}
