import React, { useEffect, useState } from 'react';
import axios from "axios";
import {useParams, Link} from 'react-router-dom'


export default function ViewQuestions({ token }) {
    const {categoryId} = useParams()
    const [category, setCategory] = useState([]);

    useEffect(() => {
        axios
            .get(`https://red-panda-question-box.herokuapp.com/api/category/${categoryId}/game`)
            .then((res) => {
                console.log(res);
                setCategory(res.data);
            });
    }, [token, categoryId]);


    return (
        <div className="App">
        {category.length === 0 &&
        <div className="wrap">
            <h1>Nothing Here!</h1>
        </div>
        }
       {category.length > 0 &&
            <div className="wrap">
             
                <h1>{category[0].category}s</h1>
                <div className="genreList">
                {category.map (game => (
                       <Link to={`/category/game/${game.id}`} className="genreLink"> <div className="gameGenre"> <h2>{game.game}</h2></div></Link>
                    ))}
                </div>
 





            </div>}
        </div>
    )
}
