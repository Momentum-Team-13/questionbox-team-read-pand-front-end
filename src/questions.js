import React, { useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import axios from "axios";

{/* <Link to={`/viewquestion/id or pk`}></Link> */}




export default function Questions({ token }) {

    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        axios
            .get(`https://red-panda-question-box.herokuapp.com/api/questions/`)
            .then((res) => {
                console.log(res);
                setQuestions(res.data);
            });
    }, [token]);

    return (
        <div className="App">
            <div className="wrap">
                <h1>Choose a Question!</h1>
                <div className="genreList">
                    {questions.length > 0 ?
                        questions.map((question, index) => (
                            <div className="gameGenre">
                           <h2 key={index}>
                           <Link to={`/question/${question.pk}`} > {question.title}</Link>
                                    </h2>
                            </div>
                        ))
                        :
                        <h3>No Results Found</h3>}
                </div>
            </div>
        </div>
    )
}