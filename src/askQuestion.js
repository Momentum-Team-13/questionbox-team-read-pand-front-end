import axios from 'axios';
import { Link } from "react-router-dom";
import { useState } from 'react';
import { Navigate } from 'react-router-dom';


export default function AskQuestion() {
    return (
        <>
            <div className="wrap">
                <h2>Ask a Question</h2>
                <form id="ask-question-form">
                    <div className="controls">
                        <label htmlFor='question-title-field'>Question Title: </label>
                        <input
                            id='question-title-field'
                            type="text"
                        />
                    </div>
                    <div className="controls">
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
                    <div className="controls">
                        <label htmlFor='question-text-field'>Question Text: </label>
                        <textarea
                            id='question-text-field'
                            rows="3"
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