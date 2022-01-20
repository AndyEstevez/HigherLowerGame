import React, { useState, useEffect } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const GamePage = () => {
    const [leftAlbum, setLeftAlbum] = useState([]);
    const [rightAlbum, setRightAlbum] = useState([]);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(localStorage.getItem('HighScore'));
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();    
    useEffect(() => {
        if(score === 0){
            api.get('/getInitialAlbums')
            .then(response => {
                setLeftAlbum(response.data['leftSideAlbum'])
                setRightAlbum(response.data['rightSideAlbum'])
                setIsLoading(false);
            })
        }
        else{
            api.get('/getRandomAlbum')
            .then(response => {
                setRightAlbum(response.data)
                setIsLoading(false)
            })
        }
    }, [score])
    

    function btnClicked(e) {
        if(leftAlbum.score <= rightAlbum.score && e.target.value === 'higher'){
            setScore(score + 1);
            setIsLoading(true)
            setLeftAlbum(rightAlbum);
        }   
        else if(leftAlbum.score >= rightAlbum.score && e.target.value === 'lower'){
            setScore(score + 1);
            setIsLoading(true)
            setLeftAlbum(rightAlbum);
        }
        else{
            // send to post game since its wrong
            if(score > highScore){
                localStorage.setItem('HighScore', score);
            }
            let path = `/postgame`;
            navigate(path, { state: {score: score }});
        }
    }

    console.log(leftAlbum.score)
    console.log(rightAlbum.score)

    return (
        <div class="container-fluid">
            <div class="row">
                <h3 class="text-center">High Score: {highScore}</h3>
                <h3 class="text-center">Score: {score}</h3>
            </div>
            <div class="row" style={{width: "auto", height: "auto",}}>
                <div class="col-sm">                    
                    <div class="card text-center" style={{width: "auto", height: "auto",}}>
                       <img class="card-img-top" src={leftAlbum.cover} alt={leftAlbum.name} referrerPolicy="no-referrer" style={{filter: "blur(4px)", WebkitFilter: "blur(4px)"}}/>
                            <div class="card-img-overlay d-flex flex-column justify-content-center align-items-center" style={{marginBottom: "115px"}}>
                                <h5 class="card-title p-2" style={{color: "white", fontSize: "1.5em"}}>{leftAlbum.name}</h5>
                                <p class="card-text p-2" style={{color: "white", fontSize: "1.5em"}}>{leftAlbum.date}</p>
                                <div class="mx-auto bg-success text-white p-2" style={{ fontSize: "1.5em", width: "auto", height: "auto" }}>{leftAlbum.score}</div>
                            </div>
                        </div>
                    
                </div>
                    
            
            <div class="col-sm">
                <div class="card text-center" style={{width: "auto", height: "auto",}}>
                    { isLoading
                        ?   <div class="d-flex justify-content-center">
                                <div class="spinner-border" role="status" style={{width: "3rem", height: "3rem"}}>
                                    <span class="sr-only" aria-hidden="true"></span>
                                </div>
                            </div> 
                        :   <img class="card-img-top" src={rightAlbum.cover} alt={rightAlbum.name} referrerPolicy="no-referrer" style={{filter: "blur(4px)", WebkitFilter: "blur(4px)"}}/>
                    }
                    <div class="card-img-overlay d-flex flex-column justify-content-center align-items-center">
                        <h5 class="card-title p-2" style={{color: "white", fontSize: "1.5em"}}>{rightAlbum.name}</h5>
                        <p class="card-text p-2" style={{color: "white", fontSize: "1.5em"}}>{rightAlbum.date}</p>
                        <div class="mx-auto bg-success text-white p-2" style={{ fontSize: "1.5em",  marginBottom: "15px", }}>?</div>
                        <button type="button" class="btn btn-success btn-lg p-2 justify-content-center" value="higher"
                                style={{width: "auto", height: "auto", backgroundColor: "white", borderColor: "#CCC", color: "black"}}
                                onClick={(e) => btnClicked(e)}>
                                Higher ⬆️
                        </button>
                        <button type="button" class="btn btn-success btn-lg p-2 justify-content-center" value="lower"
                                style={{ width: "auto", height: "auto", backgroundColor: "white", borderColor: "#CCC", color: "black"}}
                                onClick={(e) => btnClicked(e)}>
                                Lower ⬇️
                        </button>
                    </div>
                </div>
            </div>

            </div>
        </div>
    )
}

export default GamePage;