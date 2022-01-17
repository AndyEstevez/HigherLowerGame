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
        const object = JSON.parse(JSON.stringify(await connection.query(`SELECT 1 FROM album LIMIT 1`)))
        if(object.length == 0){
            console.log("IN IF SECTION")
            const getData =  await scraper.scrapePitchforkReviews(); 
            
            const albums = await db.insertScores(getData, connection)
            res.send(albums)
        }  
        else{
            console.log("IN ELSE STATEMENT")
            const scrapeData = await db.getScores(connection);
            res.send(scrapeData)
        } 
    } catch(err) {
        console.log(err)
    }
})

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}`))