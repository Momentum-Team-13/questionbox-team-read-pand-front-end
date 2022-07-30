import React, { useEffect, useState } from 'react';
import axios from "axios";
import { configure } from '@testing-library/react';

// import dummyQuestions from './dummy-questions.json'

// const apiUrl = 'https://red-panda-question-box.herokuapp.com/api'

const testToken = '9f72630224a8f9d8495aedbd2d976da0dd8c9018';

axios.interceptors.request.use(
    config => {
        config.headers.authorization = `token ${testToken}`;
        return config;
    }
);


export default function Questions({token}) {
    // const testToken = 9f72630224a8f9d8495aedbd2d976da0dd8c9018;
    
    const [question, setQuestion] = useState([]);

    useEffect(() => {
        axios
          .get(`https://red-panda-question-box.herokuapp.com/api/questions/`)
          .then((res) => {
            console.log(res);
            setQuestion(res.data);
          });
    }, [token]);


    // useEffect(() => {
    //     axios
    //       .get('https://drf-library-api.herokuapp.com/api/books', {
    //         headers: {
    //           Authorization: `Token ${token}`,
    //         },
    //       })
    //       .then((res) => {
    //         const bookTitles = res.data.map((obj) => obj.title)
    //         setBookTitles(bookTitles)
    //         setBooks(res.data)
    //         setIsLoading(false)
    //       })
    //   }, [token])



    return (
        <div className="App">
            {/* <button className="askButton">Questions</button> */}
            <div className="wrap">
                <h1>Choose a Question!</h1>
                <div>
                    
                </div>
                {/* <div className="genreList">
                    {dummyQuestions.map(dummy => (
                        <div className="gameGenre"><a href={dummy.link} className="genreLink"><h2>{dummy.name}</h2></a></div>
                    ))}
                </div> */}
            </div>
        </div>
    )
}