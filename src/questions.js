import React, { useEffect, useState, Link } from 'react';
import axios from "axios";

{/* <Link to={`/viewquestion/id or pk`}></Link> */}

const testToken = '9f72630224a8f9d8495aedbd2d976da0dd8c9018';

axios.interceptors.request.use(
    config => {
        config.headers.authorization = `token ${testToken}`;
        return config;
    }
);


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
                                        {question.title}
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