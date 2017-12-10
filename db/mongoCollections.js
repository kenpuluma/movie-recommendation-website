const dbConnection = require("./mongoConnection");

async function getCollection(collection) {
    let _col = undefined;

    return async () => {
        if (!_col) {
            const db = await dbConnection();
            _col = await db.collection(collection);
        }

        return _col;
    };
}

module.exports = {
    users: getCollection("users"),
    movies: getCollection("movies"),
    comments: getCollection("comments"),

    initCollections: async () => {
        const db = await dbConnection();
        const getCollection = await db.createCollection("users");
        const moiveCollection = await db.createCollection("movies");
        const commentCollection = await db.createCollection("comments");
    },
    dropAllCollections: async () => {
        const db = await dbConnection();
        try {
            await db.collection("users").drop();
            await db.collection("movies").drop();
            await db.collection("comments").drop();
        } catch (e) {

        }
    }
};

