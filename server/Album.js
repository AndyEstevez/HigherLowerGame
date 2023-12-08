var EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
    name: "Album",
    tableName: "album",
    columns: {
        id: {
            primary: true,
            type: "int", 
            generated: true,
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
