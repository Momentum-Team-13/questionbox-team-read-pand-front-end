import React, { useEffect, useState } from 'react';
import axios from "axios";
import {useParams, Link} from 'react-router-dom'


export default function ViewQuestions({ token }) {
    const {questionId} = useParams()
    const [question, setQuestions] = useState([]);
    const [answer, setAnswers] = useState([]);

    useEffect(() => {
        axios
            .get(`https://red-panda-question-box.herokuapp.com/api/questions/${questionId}`,
            { headers: {
                Authorization: `Token ${token}`,
              },
    })
            .then((res) => {
                console.log(res);
                setQuestions(res.data);
            });
    }, [token, questionId]);

    useEffect(() => {
        axios
            .get(`https://red-panda-question-box.herokuapp.com/api/question/${questionId}/answer/`,
            { headers: {
                Authorization: `Token ${token}`,
              },
    })
            .then((res) => {
                console.log(res);
                setAnswers(res.data);
            });
    }, [token, questionId]);


    return (
        <div className="App">
       
            <div className="wrap">
                <h1>{question.title}</h1>
               
                <div className='textBox'> <h3>{question.user} asked:</h3>
                <p>{question.description}</p>
                </div>
                {answer.map (answer => ( <div className='answerBox'> <h3>{answer.user} answered:</h3>
                <p>{answer.description}</p>
                </div>))}
               
            </div>
        </div>
    )
}
