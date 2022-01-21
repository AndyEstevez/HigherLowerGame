import { Link } from 'react-router-dom';
import background from '../bg-image.jpg'

const HomePage = () => {
    return (        
            <div >
                <div style={{ position: "relative", width: "100%", height: "100vh", display: "flex", 
                            backgroundImage: `url(${background})`, backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover"}}>
                    <div class="container text-center justify-content-center align-items-center" 
                        style={{fontFamily: "Tiempos Headline", color: "white", fontSize: "5vw", fontWeight: "600", margin: "auto"}}>
                        <h1 style={{ fontSize: "8vw"}}>Higher Lower Game</h1>
                        <p style={{ fontSize: "3vw"}}>A game of higher or lower based on Pitchfork scores.</p>
                        <p style={{ fontSize: "3vw"}}>Currently uses albums released in 2020 and 2021.</p>
                        <Link to={'/game'} style={{textDecoration: "none"}}>
                            <button type="button" 
                                class="btn btn-success btn-lg" 
                                style={{margin: "auto", fontSize: "3vw"}}>
                                Start Game
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
    )
}

export default HomePage;