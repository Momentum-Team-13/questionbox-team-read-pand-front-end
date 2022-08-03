import React, { useEffect, useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


export default function Home({token}) {

    const navigate = useNavigate()

    const [category, setCategory] = useState([]);

    useEffect(() => {
        axios
            .get(`https://red-panda-question-box.herokuapp.com/api/categories/`)        
            .then((res) => {
                console.log(res.data);
                setCategory(res.data);
            });
    }, [token]);



    return (
        <div className="App">
            <button className="askButton" onClick={() => navigate("/askquestion")}>Ask a Question</button>
            <div className="wrap">
                <h1>Choose Your Category!</h1>
                {category.length > 0 && 
                <div className="genreList">
                    {category.map (category => (
                       <Link to={`/category/${category.id}`} className="genreLink"> <div className="gameGenre"> <h2>{category.title}</h2></div></Link>
                    ))}
                </div>}
            </div>
        </div>
    )
}