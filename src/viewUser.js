import React, { useEffect, useState } from 'react';
import axios from "axios";
import {useParams, Link} from 'react-router-dom'


export default function ViewQuestions({ token }) {
    const {userId} = useParams()
    const [question, setQuestions] = useState([]);
    const [answer, setAnswers] = useState([]);
    const [favorite, setFavorites] = useState([]);

    useEffect(() => {
        axios
            .get(`https://red-panda-question-box.herokuapp.com/api/user/${userId}/question/`,
            { headers: {
                Authorization: `Token ${token}`,
              },
    })
            .then((res) => {
                setQuestions(res.data);
            });
    }, [token, userId]);

    useEffect(() => {
        axios
            .get(`https://red-panda-question-box.herokuapp.com/api/user/${userId}/answer/`,
            { headers: {
                Authorization: `Token ${token}`,
              },
    })
            .then((res) => {
                setAnswers(res.data);
            });
           
    }, [token, userId]);

    useEffect(() => {
        axios
            .get(`https://red-panda-question-box.herokuapp.com/api/user/favorite/questions`,
            {
                headers: {
                    Authorization: `Token ${token}`,
                },
            }
            )
            .then((res) => {
                setFavorites(res.data);
            })
    }, [token]);


    return (
        <div className="App">
       
            <div className="wrap">
            <div className="userProfile">
            <div className="userBox">
            <h2>Questions</h2>
            {question.map (question => ( <div className='questionBox'> <Link to={`/question/${question.pk}`} className="userLink"> 
            <div className="userQuestion">
            <h3>{question.title}</h3>
            </div>
            </Link>
                </div>))}</div>
            <div className="userBox">
            <h2>Answers</h2>
            {answer.map (answer => ( <div className='answerBox'> <Link to={`/question/${answer.question_id}`} className="userLink"> 
            <div className="userAnswer">
            <h3>{answer.description}</h3>
            </div>
            </Link>
                </div>))}</div>
      
            </div>
            <div className="faveBox">
                <h2>Favorite Questions</h2>
                {favorite.map (favorite => ( <Link to={`/question/${favorite.pk}`} className="faveLink"><div className='favoriteBox'>  
            <div className="userFavorite">
            <h3>{favorite.title}</h3>
            </div>
            
                </div></Link>))}
            </div>
            </div>
        </div>
    )
}
