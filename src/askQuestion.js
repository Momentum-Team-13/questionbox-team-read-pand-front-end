import axios from 'axios';
import { Link } from "react-router-dom";
import { useState } from 'react';
import { Navigate } from 'react-router-dom';


export default function AskQuestion() {
    return (
        <div className="App">
            <div className="wrap">
                <h1>Choose Your Category!</h1>
                <div className="genreList">
                </div>
            </div>
        </div>
    )

}