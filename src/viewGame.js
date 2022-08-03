import React, { useEffect, useState } from 'react';
import axios from "axios";
import {useParams, Link} from 'react-router-dom'


export default function ViewQuestions({ token }) {
    const {gameId} = useParams()
    const [game, setGame] = useState([]);

    useEffect(() => {
        axios
            .get(`https://red-panda-question-box.herokuapp.com/api/game/${gameId}/question/`)
            .then((res) => {
                console.log(res);
                setGame(res.data);
            });
    }, [token, gameId]);


    return (
        <div className="App">
                {game.length === 0 &&
        <div className="wrap">
            <h1>Nothing Here!</h1>
        </div>
        }
       {game.length > 0 && 
            <div className="wrap">
                <h1>{game[0].game}</h1>
                <div className="genreList">
                {game.map (question => (
                       <Link to={`/question/${question.pk}`} className="genreLink"> 
                       <div className="gameGenre"> 
                       <h2>{question.title}</h2>
                       </div>
                       
                       </Link>
                    ))}
                </div>
 





            </div>}
        </div>
    )
}
