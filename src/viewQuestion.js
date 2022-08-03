import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useParams, Link } from 'react-router-dom'


export default function ViewQuestions({ token }) {
    const { questionId } = useParams()
    const [question, setQuestions] = useState([]);
    const [answer, setAnswers] = useState([]);

    useEffect(() => {
        axios
            .get(`https://red-panda-question-box.herokuapp.com/api/questions/${questionId}`,
                {
                    headers: {
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
                {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                })
            .then((res) => {
                console.log(res);
                setAnswers(res.data);
            });
    }, [token, questionId]);



    const [questionDescription, setQuestionDescription] = useState('')

    const [error, setError] = useState(null)

    const handleAnswerQuestion = (event) => {
        event.preventDefault()
        setError(null)

        axios
            .post(`https://red-panda-question-box.herokuapp.com/api/question/${questionId}/answer/`,
                {
                    description: questionDescription,
                    favorited_by: []
                },
                {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                })
            .then((res) => {
                console.log(res)
                window.location.reload()
            })
            .catch((error) => {
                setError(error.message)
            })
    }


    return (
        <>
            <div className="App">
                <div className="wrap">
                    <h1>{question.title}</h1>
                    <div className='textBox'> <h3>{question.user} asked:</h3>
                        <p>{question.description}</p>
                    </div>
                    {answer.map(answer => (<div className='answerBox'> <h3>{answer.user} answered:</h3>
                        <p>{answer.description}</p>
                    </div>))}

                    {error && <div className="error">{error}</div>}
                    <form id="answer-question-form" onSubmit={handleAnswerQuestion}>

                        <div className="controls-3">
                            <div className="answer-label">
                                <label htmlFor='answer-text-field'>Post an Answer </label>
                            </div>
                            <textarea
                                id='answer-text-field'
                                rows="4"
                                cols="50"
                                value={questionDescription}
                                onChange={(e) => setQuestionDescription(e.target.value)}
                            />
                        </div>
                        <div className="form-submit">
                            <input type="submit" value="Post Answer" className="button" />
                        </div>
                    </form>

                </div>
            </div>
        </>
    )
}
