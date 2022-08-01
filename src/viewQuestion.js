import React, { useEffect, useState } from 'react';
import axios from "axios";
import {useParams, Link} from 'react-router-dom'


export default function ViewQuestions({ token }) {
    const {questionId} = useParams()
    const [question, setQuestions] = useState([]);

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


    return (
        <div className="App">
       
            <div className="wrap">
                <h1>{question.title}</h1>
                <div className="genreList">

                </div>
 





            </div>
        </div>
    )
}
