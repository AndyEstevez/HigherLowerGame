import React, { useState, useEffect } from 'react';
import api from '../api'

const GamePage = () => {
    const [leftAlbum, setLeftAlbum] = useState([]);
    const [rightAlbum, setRightAlbum] = useState([]);
    // const [correctAnswer, setCorrectAnswer] = useState(true);
    const [score, setScore] = useState(0);

    useEffect(() => {
        api.get('/getInitialAlbums')
            .then(response => {
                setLeftAlbum(response.data['leftSideAlbum'])
                setRightAlbum(response.data['rightSideAlbum'])
            })
    }, [])

    useEffect(() => {
        api.get('/getRandomAlbum')
            .then(response => {
                setRightAlbum(response.data)
            })
    }, [score])

    const incrementScore = () => {
        setScore(score + 1);
    }

    return (
        <div class="container d-flex justify-content-center" style={{ display: "inline-block" }}>
           <div class="card text-center" style={{width: "50%", float: "left", alignItems: "center", margin: "auto" }}>
                <img class="card-img-top" src={leftAlbum.cover} alt={leftAlbum.name} referrerPolicy="no-referrer"/>
                <div class="card-body">
                    <h5 class="card-title">{leftAlbum.name}</h5>
                    <p class="card-text">{leftAlbum.date}</p>
                    <div class="w-100 p-3 bg-success text-white" style={{ fontSize: "1.5em" }}>{leftAlbum.score}</div>
                </div>
            </div>
            <div style={{display: "inline-block", margin: "auto"}}>
            <button type="button" 
                    class="btn btn-success btn-lg" style={{display: "block", margin: "auto", marginBottom: "25px"}}>
                    Higher Score ⬆️
            </button>

            <button type="button" 
                    class="btn btn-success btn-lg" style={{display: "block", margin: "auto"}}>
                    Lower Score ⬇️
            </button>
            </div>
            <div class="card text-center" style={{width: "50%", float: "left", alignItems: "center", margin: "auto" }}>
                <img class="card-img-top" src={rightAlbum.cover} alt={rightAlbum.name} referrerPolicy="no-referrer"/>
                <div class="card-body">
                    <h5 class="card-title">{rightAlbum.name}</h5>
                    <p class="card-text">{rightAlbum.date}</p>
                    <div class="w-100 p-3 bg-success text-white" style={{ fontSize: "1.5em" }}>?</div>
                </div>
            </div>
        </div>
    )
}

export default GamePage;