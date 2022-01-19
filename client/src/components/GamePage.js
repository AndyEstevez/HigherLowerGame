import React, { useState, useEffect } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const GamePage = () => {
    const [leftAlbum, setLeftAlbum] = useState([]);
    const [rightAlbum, setRightAlbum] = useState([]);
    const [score, setScore] = useState(0);
    const navigate = useNavigate();
    const [highScore, setHighScore] = useState(0);
    
    useEffect(() => {
        if(score === 0){
            api.get('/getInitialAlbums')
            .then(response => {
                setLeftAlbum(response.data['leftSideAlbum'])
                setRightAlbum(response.data['rightSideAlbum'])
            })
        }
        else{
            api.get('/getRandomAlbum')
            .then(response => {
                setRightAlbum(response.data)
            })
        }
    }, [score])
    

    function btnClicked(e) {
        if(leftAlbum.score <= rightAlbum.score && e.target.value === 'higher'){
            setScore(score + 1);
            setLeftAlbum(rightAlbum);
        }   
        else if(leftAlbum.score >= rightAlbum.score && e.target.value === 'lower'){
            setScore(score + 1);
            setLeftAlbum(rightAlbum);
        }
        else{
            // send to post game since its wrong
            let path = `/postgame`;
            navigate(path);
        }
    }

    console.log(leftAlbum.score)
    console.log(rightAlbum.score)

    return (
        <div class="container d-flex justify-content-center" style={{ display: "inline-block" }}>
            <h3>High Score: </h3>

           <div class="card text-center" style={{width: "100%", float: "left", alignItems: "center", margin: "auto", marginRight: "10px" }}>
                <img class="card-img-top" src={leftAlbum.cover} alt={leftAlbum.name} referrerPolicy="no-referrer" style={{margin: "auto"}}/>
                <div class="card-body">
                    <h5 class="card-title">{leftAlbum.name}</h5>
                    <p class="card-text">{leftAlbum.date}</p>
                    <div class="w-100 p-3 bg-success text-white" style={{ fontSize: "1.5em" }}>{leftAlbum.score}</div>
                </div>
            </div>
            
            <div style={{display: "inline-block", margin: "auto"}}>
                <button type="button" class="btn btn-success btn-lg" value="higher"
                        style={{display: "block", margin: "auto", marginBottom: "25px", backgroundColor: "white", borderColor: "#CCC", color: "black"}}
                        onClick={(e) => btnClicked(e)}>
                        Higher ⬆️
                </button>
                <button type="button" class="btn btn-success btn-lg" value="lower"
                        style={{display: "block", margin: "auto", marginBottom: "25px", backgroundColor: "transparent", borderColor: "#CCC", color: "black"}}
                        onClick={(e) => btnClicked(e)}>
                        Lower ⬇️
                </button>
            </div>

            <div class="card text-center" style={{width: "100%", float: "left", alignItems: "center", margin: "auto", marginLeft: "10px" }}>
                <img class="card-img-top" src={rightAlbum.cover} alt={rightAlbum.name} referrerPolicy="no-referrer"/>
                <div class="card-body">
                    <h5 class="card-title">{rightAlbum.name}</h5>
                    <p class="card-text">{rightAlbum.date}</p>
                    <div class="w-100 p-3 bg-success text-white" style={{ fontSize: "1.5em" }}>?</div>
                </div>
            </div>

            <div class="text-center">
                <h3 class="mt-auto p-2 text-center">Score: {score}</h3>
            </div>
        </div>
    )
}

export default GamePage;