import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";
import useLocalStorageState from "use-local-storage-state";

export default function ViewQuestions({ token }) {
  const { questionId } = useParams();
  const [question, setQuestions] = useState(null);
  const [faveQuestion, setFaveQuestion] = useState("black");
  const [faveAnswer, setFaveAnswer] = useState("black");
  const [username, setUsername] = useLocalStorageState("libraryUsername", "");
  const [answer, setAnswers] = useState([]);
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
  }, [token, questionId]);

  useEffect(() => {
    axios
      .get(
        `https://red-panda-question-box.herokuapp.com/api/question/${questionId}/answer/`
      )
      .then((res) => {
        setAnswers(res.data);
      });
  }, [token, questionId, answer]);

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
        setAnswers([res.data])
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
        setAnswers([])
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  useEffect(() => {
    if (question && question.favorited_by.includes(username)) {
      setFaveQuestion("gold");
    }
  }, [question, username]);

  const [selectStyle, setSelectStyle] = useState("answer");

  const [likeCount, setLikeCount] = useState(0);

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
          {answer.map((answer) => (
            <div className="answer">
              {" "}
              <h3>{answer.user} answered:</h3>
              <p>{answer.description}</p>
              <div className="options">
              </div>
              <div className="options">
                {username === answer.user && (
                    <button className="deleteMe">
                    <p onClick={() => deleteAnswer({answer})} className="delete">
                      Delete
                    </p></button>
                )}
              </div>
            </div>
          ))}

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
