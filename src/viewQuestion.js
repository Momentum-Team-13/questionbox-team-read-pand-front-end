import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useParams, Link } from 'react-router-dom'


export default function ViewQuestions({ token }) {
    const { questionId } = useParams()
    const [question, setQuestions] = useState([]);
    const [answer, setAnswers] = useState([]);
    let faveFind = 0
    let fave = "faveOff"
    const [favorite, setFavorite] = useState([]);
    const [questionDescription, setQuestionDescription] = useState('')
    const [error, setError] = useState(null)
    const pk = parseFloat(questionId);

    useEffect(() => {
        axios
            .get(`https://red-panda-question-box.herokuapp.com/api/questions/${questionId}`)
            .then((res) => {
                setQuestions(res.data);
            });
    }, [token, questionId]);


    useEffect(() => {
        axios
            .get(`https://red-panda-question-box.herokuapp.com/api/question/${questionId}/answer/`)
            .then((res) => {
                setAnswers(res.data);
            });
    }, [token, questionId]);

    const handleAnswerQuestion = (event) => {
        event.preventDefault()
        setError(null)

        axios
            .post(`https://red-panda-question-box.herokuapp.com/api/question/${questionId}/answer/`,
                {
                    description: questionDescription,
                    favorited_by: [],
                },
                {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                })
            .then((res) => {
                window.location.reload(true)
            })
            .catch((error) => {
                setError(error.message)
            })
    }
    
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
                setFavorite(res.data);
            })
    }, [token]);

    function faveMaker() {
        axios
        .post(`https://red-panda-question-box.herokuapp.com/api/questions/${questionId}/favorites/`,
        {
            favorited_by: [],
        },
        {
            headers: {
                Authorization: `Token ${token}`,
            },
        })
        .then(() => {
            window.location.reload(true)
        })
            .catch((error) => {
                setError(error.message)
            })
    }

    function faveTaker() {
  
        axios
        .delete(`https://red-panda-question-box.herokuapp.com/api/questions/${questionId}/favorites/`,
        {
            headers: {
                Authorization: `Token ${token}`,
            },
        })
        .then(() => {
            window.location.reload(true)
        })
            .catch((error) => {
                setError(error.message)
            })
    }

    if (favorite.length > 0) {
       faveFind = (favorite.find((fav) => fav.pk === pk))
    }


    const [selectStyle, setSelectStyle] = useState('answer');

    // let handleSelectAnswer = () => {
    //     setSelectStyle('selectedAnswerBox')
    // };

    // onClick={() => setSelectStyle('selectedAnswerBox')}

    const [likeCount, setLikeCount] = useState(0);

    // let handleLikes = () => {
    //     setLikeCount(likeCount + 1)
    // };

    

    return (
        
        <>
            <div className="App">
                <div className="wrap">
                    <h1>{question.title}</h1> 
                    <div className='textBox'> <h3>{question.user} asked:</h3>
                        <p>{question.description}</p>
                        {faveFind && 
                        <button className="faveOn" onClick={() => faveTaker()} ><img src="../images/star-off.png" alt="fave-icon"/></button>}
                        {!faveFind && 
                        <button className="faveOff" onClick={() => faveMaker()} ><img src="../images/star-off.png" alt="fave-icon"/></button>}
                    </div>
                    {answer.map(answer => (<div className='answer'> <h3>{answer.user} answered:</h3>
                        <p>{answer.description}</p>
                    </div>))}

                    <div>
                        {answer.map((answer, index) => (
                            <div key={index} className={selectStyle} >
                                <h3>{answer.user} answered:</h3>
                                <p>{answer.description}</p>
                                {/* <button onClick={() => setSelectStyle('selectedAnswerBox')}>Select Answer</button> */}
                                {/* <button onClick={() => setLikeCount(likeCount + 1)}>👍 Likes {likeCount}</button> */}
                            </div>
                        ))}
                    </div>


                    {/* {error && <div className="error">{error}</div>} */}

                    {token &&
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
                    }
                </div>
            </div>
        </>
    )
}
