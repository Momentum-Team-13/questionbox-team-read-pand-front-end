import React, { useState } from 'react';
export default function ViewQuestions() {
    const [expanded, setExpanded] = useState(false)
    return (
        <div className="App">
            {/* <button className="askButton">Questions</button> */}
            <div className="wrap">
                <h2>Question Title</h2>
                <p>Answer</p>
            </div>
        </div>
    )
}
