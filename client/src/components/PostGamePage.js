import React  from 'react';
import { useLocation, Link } from 'react-router-dom';
import background from '../bg-image.jpg';
import { TwitterShareButton } from 'react-twitter-embed';

const PostGamePage = () => {
    const location = useLocation();
    
    // add ability to tweet/share 

    return(
        <div>
            <div style={{ position: "relative", width: "100%", height: "100vh", display: "flex", 
                        backgroundImage: `url(${background})`, backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover"}}>
                <div class="container text-center justify-content-center align-items-center"
                    style={{fontFamily: "Tiempos Headline", color: "white", fontSize: "2em", fontWeight: "600", margin: "auto"}}>
                <h1>You Scored: {location.state.score}</h1>
                <TwitterShareButton
                    url={'[public site not created yet]'}
                    options={{ text: 'Just played Higher or Lower Pitchfork Edition. Play it now'}}/>
                <Link to={'/'} style={{textDecoration: "none"}}>
                    <button type="button" class="btn btn-dark rounded-pill" style={{margin: "auto"}}>Back to Home</button>
                </Link>
                <Link to={'/game'} style={{textDecoration: "none"}}>
                    <button type="button" class="btn btn-dark rounded-pill" style={{margin: "auto"}}>Play Again</button>
                </Link>
                </div>
            </div>
        </div>
    )
}

export default PostGamePage;