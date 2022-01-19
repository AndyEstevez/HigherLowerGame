import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div class="container text-center justify-content-center align-items-center" style={{ display: "block", fontFamily: "Tiempos Headline"}}>
            <h1>Higher Lower Game</h1>
            <p>A game of higher or lower based on Pitchfork scores</p>
            <p>Currently uses albums released in 2020 and 2021</p>

            <Link to={'/game'} style={{textDecoration: "none"}}>
                <button type="button" 
                    class="btn btn-success btn-lg" 
                    style={{display: "block", margin: "auto"}}>
                    Start Game
                </button>
            </Link>
            
            {/* <button type="button" class="btn btn-success btn-lg" 
                style={{display: "block", margin: "auto", marginTop: "100px"}}
                onClick={updateDatabase}>
                Check For Update
            </button> */}
        </div>
    )
}

export default HomePage;