import React, { useState, useEffect } from 'react';
import api from '../api';

const HomePage = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [initialAlbums, setInitialAlbums] = useState([]);
    const [randomAlbum, setRandomAlbum] = useState([])

    useEffect(() => {
        api.get('/getScores')
            .then(response => { 
                setData(response.data)
                setIsLoading(false)
            })

        api.get('/getInitialAlbums')
            .then(response => { 
                setInitialAlbums(response.data)
            })

        api.get('/getRandomAlbum')
            .then(response => {
                setRandomAlbum(response.data)
            })
    }, [])

    function updateDatabase() {
        setIsLoading(true)
        api.post('/updateScores')
            .then(response => { console.log(response.data)
                setData(response.data)
                setIsLoading(false)
            })
    }

    console.log(initialAlbums)
    console.log(randomAlbum)

    return (
        <div class="container">
            <div>HOME PAGE</div>
            <button type="button" class="btn btn-success btn-lg" 
                style={{display: "block", margin: "auto", marginTop: "100px"}}
                onClick={updateDatabase}>
                Check For Update
            </button>
        </div>
    )
}

export default HomePage;