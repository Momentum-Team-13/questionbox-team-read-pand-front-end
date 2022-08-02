import dummy from './dummy-data.json';
import { useNavigate } from 'react-router-dom';

export default function Home() {

    const navigate = useNavigate()

    return (
        <div className="App">
            <button className="askButton" onClick={() => navigate("/askquestion")}>Ask a Question</button>
            <div className="wrap">
                <h1>Choose Your Category!</h1>
                <div className="genreList">
                    {dummy.map(dummy => (
                        <div className="gameGenre"><a href={dummy.link} className="genreLink"><h2>{dummy.name}</h2></a></div>
                    ))}
                </div>
            </div>
        </div>
    )
}