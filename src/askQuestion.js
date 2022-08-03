import axios from 'axios';
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';


export default function AskQuestion({ token }) {

    const [questionTitle, setQuestionTitle] = useState('')

    const [questionText, setQuestionText] = useState('')

    const [error, setError] = useState(null)

    const resetForm = () => {
        setQuestionTitle('')
        setQuestionText('')
    }


    useEffect(() => {
        axios
            .get(`https://red-panda-question-box.herokuapp.com/api/questions/8`,
                {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                })
            .then((res) => {
                console.log(res.data)
            })
    })


    const handleAskQuestion = (event) => {
        event.preventDefault()
        setError(null)

        axios
            .post(`https://red-panda-question-box.herokuapp.com/api/questions/`,
                {
                    title: questionTitle,
                    description: questionText

                },
                {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                })
            .then((res) => {
                console.log(res)
                resetForm()
            })
            .catch((error) => {
                setError(error.message)
            })
    }


    if (!token) {
        return <Navigate to="/login" />
    }

    
    return (
        <>
            <div className="wrap">
                <h2>Ask a Question</h2>
                {error && <div className="error">{error}</div>}
                <form id="ask-question-form" onSubmit={handleAskQuestion}>
                    <div className="controls-2">
                        <label htmlFor='question-title-field'>Question Title: </label>
                        <input
                            id='question-title-field'
                            type="text"
                            value={questionTitle}
                            onChange={(e) => setQuestionTitle(e.target.value)}
                        />
                    </div>
                    <div className="controls-2">
                        <label htmlFor='game-title-field'>Game Title: </label>
                        <select id='game-title-field'>
                            <option value="">Arena Fighters</option>
                            <option value="">Fighters</option>
                            <option value="">First-Person Shooter</option>
                            <option value="">Horror</option>
                            <option value="">Puzzle Game</option>
                            <option value="">Role Playing Game</option>
                            <option value="">Visual Novels</option>
                        </select>
                    </div>
                    <div className="controls-2">
                        <div className="question-label">
                        <label htmlFor='question-text-field'>Question Text: </label>
                        </div>
                        <textarea
                            id='question-text-field'
                            rows="4"
                            cols="50"
                            value={questionText}
                            onChange={(e) => setQuestionText(e.target.value)}
                        />
                    </div>
                    <div className="form-submit">
                        <input type="submit" value="Post Question" className="button" />
                    </div>
                </form>
            </div>
        </>
    )

}