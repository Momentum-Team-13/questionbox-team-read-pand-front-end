import React, { useEffect, useState } from 'react';
import axios from "axios";
import {useParams, link} from 'react-router-dom'


export default function ViewQuestions({ token }, {question}) {
    const {questionId} = useParams()
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        axios
            .get(`https://red-panda-question-box.herokuapp.com/api/questions/${questionId}`)
            .then((res) => {
                console.log(res);
                setQuestions(res.data);
            });
    }, [token, questionId]);


    return (
        <div className="App">
            <div className="wrap">
                <h1>Question</h1>
                <div className="genreList">
                    {questions.length > 0 ?
                        questions.map((question, index) => (
                            <div key={index} className="gameGenre"><h2>{question.description}</h2></div>
                        ))
                        :
                        <h3>No Results Found</h3>}
                </div>






            </div>
        </div >
    )
}
