import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";
import useLocalStorageState from "use-local-storage-state";

export default function ViewQuestions({ token }) {
  const { questionId } = useParams();
  const [question, setQuestions] = useState(null);
  const [faveQuestion, setFaveQuestion] = useState("black");
  const [favorite, setFavorite] = useState(null);
  const [username, setUsername] = useLocalStorageState("libraryUsername", "");
  const [answer, setAnswers] = useState(null);
  const [best, setBest] = useState({});
  const [bestStyle, setBestStyle] = useState("black");
  const [handleAnswer, setHandleAnswer] = useState(answer)
  const [questionDescription, setQuestionDescription] = useState("");
  const [error, setError] = useState(null);
  const navigateTo = useNavigate();

  const emptyForm = () => {
    setQuestionDescription('')
}

  useEffect(() => {
    axios
      .get(
        `https://red-panda-question-box.herokuapp.com/api/questions/${questionId}`
      )
      .then((res) => {
        setQuestions(res.data);
      });
  }, [token, questionId, favorite]);

  useEffect(() => {
    axios
      .get(
        `https://red-panda-question-box.herokuapp.com/api/question/${questionId}/answer/`
      )
      .then((res) => {
        setAnswers(res.data);
      });
  }, [token, questionId, handleAnswer]);
  

  const handleAnswerQuestion = (event) => {
    event.preventDefault();
    setError(null);
    axios
      .post(
        `https://red-panda-question-box.herokuapp.com/api/question/${questionId}/answer/`,
        {
          description: questionDescription,
          favorited_by: [],
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((res) => {
        setHandleAnswer(answer)
        emptyForm()
      })
  };

  function favoriteQuestion() {
    if (question.favorited_by.includes(username)) {
      axios
        .delete(
          `https://red-panda-question-box.herokuapp.com/api/questions/${questionId}/favorites/`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        )
        .then(() => {
          setFaveQuestion("black");
          setFavorite(null)
        });
    }
    if (!question.favorited_by.includes(username)) {
      axios
        .post(
          `https://red-panda-question-box.herokuapp.com/api/questions/${questionId}/favorites/`,
          {
            favorited_by: [],
          },
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        )
        .then(() => {
          setFaveQuestion("gold");
          setFavorite(question.favorited_by)
        });
    }
  }


  function deleteQuestion() {
    axios
      .delete(
        `https://red-panda-question-box.herokuapp.com/api/question/${questionId}/delete`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then(() => {
        navigateTo("/");
      })
      .catch((error) => {
        setError(error.message);
      });
  }

  const deleteAnswer = ({answer}) => {
    setError(null);
    axios
      .delete(
        `https://red-panda-question-box.herokuapp.com/api/answer/${answer.id}/delete`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then(() => {
        setHandleAnswer(answer);
      })
      .catch((error) => {
        setError(error.message);
      });
      
  };

 function bestAnswerSetter(answer){
      setBest(answer)
  }

  useEffect(() => {
    if (question && question.favorited_by.includes(username)) {
      setFaveQuestion("gold");
    }
  }, [question, username]);

  return (
    <>
      <div className="App">
        <div className="wrap">
          {question && (
            <>
              <h1>{question.title}</h1>
              <div className="textBox">
                {" "}
                <h3>{question.user} asked:</h3>
                <p>{question.description}</p>
                <div className="optionBox">
                
                  <button
                    className="faveOn"
                    style={{ backgroundColor: faveQuestion }}
                    onClick={() => favoriteQuestion()}
                  >
                    <img src="../images/star-off.png" alt="fave-icon" />
                  </button>
              
                
                  {username === question.user && (
                      <button className="deleteMe">
                    <p onClick={() => deleteQuestion()} className="delete">
                      Delete
                    </p></button>
                  )}
                </div>
              </div>
            </>
          )}
          {answer && 
          <>
          {best > 0 &&
          <div className="answer bestOne">
            <h3>{answer[{best}].user} said it best:</h3>
            <p>{answer[{best}].description}</p>
          </div>}
          {answer.map((answer) => (
            <div className="answer">
              {" "}
              <h3>{answer.user} answered:</h3>
              <p>{answer.description}</p>
              <div className="options">
              {question && username === 1234567890 &&
                <button
                    className="best"
                    style={{ backgroundColor: bestStyle}}
                    onClick={() => bestAnswerSetter(answer.id)}
                  >
                    <img src="../images/star-off.png" alt="fave-icon" />
                  </button>
              }
                {username === answer.user && (
                    <button className="deleteMe">
                    <p onClick={() => deleteAnswer({answer})} className="delete">
                      Delete
                    </p></button>
                )}
              </div>
            </div>
          ))}</>}

          {token && (
            <form id="answer-question-form" onSubmit={handleAnswerQuestion}>
              <div className="controls-3">
                <div className="answer-label">
                  <label htmlFor="answer-text-field">Post an Answer </label>
                </div>
                <textarea
                  id="answer_text_field"
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
          )}
        </div>
      </div>
    </>
  );
}
