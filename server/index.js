const express = require('express')
const cors = require('cors')
const scraper = require('./webscraper')
const db = require('./db')
require('dotenv').config();

const app = express()
app.use(cors());

app.get('/api/getScores', async(req, res) => {
    const connection = await db.getConnection();
    const scrapeData = await db.getScores(connection);
    res.send(scrapeData);
})

app.post('/api/updateScores', async(req, res) => {
    const connection = await db.getConnection();
    const scrapeData = await scraper.scrapePitchforkReviews();
    const updatedScores = await db.updateScores(scrapeData, connection);
    res.send(updatedScores)
})

app.post('/api/insertScores', async(req, res) => {
    try {
        const connection = await db.getConnection();
            console.log("IN TRY SECTION")
            const getData =  await scraper.scrapePitchforkReviews(); 
            const albums = await db.insertScores(getData, connection)
            res.send(albums)
    } catch(err) {
        console.log(err)
    }
})

app.get('/api/getInitialAlbums', async(req, res) => {
    const connection = await db.getConnection();
    const initialAlbums = await db.getInitialAlbums(connection);
    res.send(initialAlbums);
})

app.get('/api/getRandomAlbum', async(req, res) => {
    const connection = await db.getConnection();
    const randomAlbum = await db.getRandomAlbum(connection);
    res.send(randomAlbum);
})

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}`))