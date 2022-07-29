import dummy from './dummy-data.json'

export default function Home() {
    <div className="App">
        <button className="askButton">Ask a Question</button>
        <div className="wrap">
            <h1>Choose Your Category!</h1>
            <div className="genreList">
                {dummy.map(dummy => (
                    <div className="gameGenre"><a href={dummy.link} className="genreLink"><h2>{dummy.name}</h2></a></div>
                ))}
            </div>
        </div>
    </div>
}