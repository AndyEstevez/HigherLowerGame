import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

const HomePage = () => {
    return (
        <div class="container">
            <h1></h1>
            <p>A game of higher or lower based on Pitchfork scores</p>
            <p>Currently uses albums released in 2020 and 2021</p>

            <Link to={'/game'}>
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