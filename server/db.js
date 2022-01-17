const typeorm = require('typeorm')

const EntitySchema = require('typeorm').EntitySchema;

class Album {
    constructor(id, name, date, score, cover){
        this.id = id;
        this.name = name;
        this.date = date;
        this.score = score;
        this.cover = cover;
    }
}

const AlbumSchema = new EntitySchema({
    name: "Album",
    target: Album,
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        name: {
            type: "text"
        },
        date: {
            type: "text"
        },
        score: {
            type: "text"
        },
        cover: {
            type: "text"
        }
    }
})

async function getConnection() {
    return await typeorm.createConnection({
        type: "mysql",
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        synchronize: true,
        logging: false,
        entities: [
            AlbumSchema
        ]
    })
}

async function getScores(connection) {
    const albumRepo = await connection.getRepository(Album)
    const albums = await albumRepo.find();
    
    connection.close();
    return albums;
}

// get initial 2 random albums
async function getInitialAlbums(connection) {
    const albumRepo = await connection.getRepository(Album);
    const leftSideAlbum = await albumRepo.createQueryBuilder('album').orderBy('RAND()').getOne();
    const rightSideAlbum = await albumRepo.createQueryBuilder('album').orderBy('RAND()').getOne();

    connection.close();
    return ({leftSideAlbum, rightSideAlbum});
}

async function getRandomAlbum(connection) {
    const albumRepo = await connection.getRepository(Album);
    const randomAlbum = await albumRepo.createQueryBuilder('album').orderBy('RAND()').getOne();

    connection.close();
    return randomAlbum;
}

async function updateScores(data, connection) {
    const albumRepo = connection.getRepository(Album);
    let tempObject;
    for(let i = 0; i < data.length; i++){
        tempObject = await albumRepo.find({where: {name: data[i].name}})
        if(tempObject.length == 0){
            const album = new Album()
            album.name = data[i].name
            album.date = data[i].date
            album.score = data[i].score
            album.cover = data[i].cover
            console.log(album)

            await albumRepo.save(album);
        }
    }

    const albums = await albumRepo.find();
    connection.close()
    return albums;
}

async function insertScores(data, connection) { 
    for(let d of data){
        const album = new Album()
        album.name = d.name
        album.date = d.date
        album.score = d.score
        album.cover = d.cover

        const albumRepo = connection.getRepository(Album);
        const res = await albumRepo.save(album);
    }

    const albumRepo = connection.getRepository(Album); 
    const allAlbums = await albumRepo.find();
    connection.close();
    return allAlbums;
}

module.exports = {
    getConnection,
    insertScores,
    getScores,
    updateScores,
    getInitialAlbums,
    getRandomAlbum
}