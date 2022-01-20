import { Link } from 'react-router-dom';
import background from '../bg-image.jpg'

const HomePage = () => {
    return (        
            <div>
                <div style={{ position: "relative", width: "100%", height: "100vh", display: "flex", 
                            backgroundImage: `url(${background})`, backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover"}}>
                    <div class="container text-center justify-content-center align-items-center" 
                        style={{fontFamily: "Tiempos Headline", color: "white", fontSize: "2em", fontWeight: "600", margin: "auto"}}>
                        <h1 style={{ fontSize: "4em"}}>Higher Lower Game</h1>
                        <p>A game of higher or lower based on Pitchfork scores.</p>
                        <p>Currently uses albums released in 2020 and 2021.</p>
                        <Link to={'/game'} style={{textDecoration: "none"}}>
                            <button type="button" 
                                class="btn btn-success btn-lg" 
                                style={{margin: "auto"}}>
                                Start Game
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
    )
}

export default HomePage;