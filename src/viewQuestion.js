import React, { useEffect, useState } from 'react'; 
import axios from "axios";


const testToken = '9f72630224a8f9d8495aedbd2d976da0dd8c9018';

axios.interceptors.request.use(
    config => {
        config.headers.authorization = `token ${testToken}`;
        return config;
    }
);

export default function ViewQuestions({ token }) {

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
