import axios from 'axios';
import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';


export default function AskQuestion({ token }) {

    const [questionTitle, setQuestionTitle] = useState('')

    const [questionText, setQuestionText] = useState('')

    const [error, setError] = useState(null)

    const [gameTitles, setGameTitles] = useState([])

    const [dropItem, setDropItem] = useState('1')

    const [linkPK, setLinkPK] = useState(null)

    const navigateTo = useNavigate()

    const resetForm = () => {
        setQuestionTitle('')
        setQuestionText('')
        // setDropItem('1')
    }


    useEffect(() => {
        axios
            .get(`https://red-panda-question-box.herokuapp.com/api/games/`,
                {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                })
            .then((res) => {
                // console.log(res);
                console.log(res.data);
                setGameTitles(res.data);
            })
    }, [token]);



    useEffect(() => {
        axios
            .get(`https://red-panda-question-box.herokuapp.com/api/questions/`,
                {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                })
            .then((res) => {
                console.log(res.data);
                const updatedLength = res.data.length - 1;
                console.log(updatedLength);
                const currentPK = res.data[updatedLength].pk;
                console.log(currentPK);
                setLinkPK(currentPK+1)
            })
    }, [token]);

    // console.log(linkPK)
    

    const handleAskQuestion = (event) => {
        event.preventDefault()
        setError(null)

        axios
            .post(`https://red-panda-question-box.herokuapp.com/api/game/${dropItem}/question/`,
                {
                    title: questionTitle,
                    description: questionText,
                    favorited_by: []
                },
                {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                })
            .then((res) => {
                console.log(res);
                resetForm();
                navigateTo(`/question/${linkPK}`)
            })
            // .then(Moveon('/'))
            .catch((error) => {
                setError(error.message)
            })
    }

    // `https://red-panda-question-box.herokuapp.com/api/game/${1}/question/`

    // `https://red-panda-question-box.herokuapp.com/api/questions/${linkPK}`


    if (!token) {
        return <Navigate to="/login" />
    }


    return (
        <>
            <div className="wrap">
                <h2>Ask a Question</h2>
                {error && <div className="error">{error}</div>}
                <form id="ask-question-form" onSubmit={handleAskQuestion} className="questionForm">
                    <div className="controls-2">
                        <label htmlFor='question-title-field'>Question Title: </label>
                        <input
                            id='question-title-field'
                            type="text"
                            value={questionTitle}
                            onChange={(e) => setQuestionTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div className="controls-2">
                        <label htmlFor='game-title-field'>Game Title: </label>
                        <select
                            id='game-title-field'
                            // value={dropItem}
                            onChange={(e) => setDropItem(e.target.value)}
                        >
                            {gameTitles.map((gamez, index) => (
                                <option key={index} value={gamez.id}>
                                    {gamez.game}
                                </option>
                            ))}
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
                            required
                        />
                    </div>

                    <div className="form-submit">
                        <input type="submit" value="Post Question" className="button" />
                    </div>
                    {/* <p className="controls-2">{dropItem}</p> */}
                </form>
            </div>
        </>
    )

}