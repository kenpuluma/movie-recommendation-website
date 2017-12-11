const dbConnection = require("./mongoConnection");

const getCollection = (collection) => {
    let _col = undefined;

    return async () => {
        if (!_col) {
            const db = await dbConnection();
            _col = await db.collection(collection);
        }

        return _col;
    };
};

module.exports = {
    users: getCollection("users"),
    movies: getCollection("movies"),
    comments: getCollection("comments"),

    initCollections: async () => {
        const db = await dbConnection();
        await db.createCollection("users");
        await db.createCollection("movies");
        await db.createCollection("comments");
    },

    dropAllCollections: async () => {
        const db = await dbConnection();
        try {
            await db.collection("users").drop();
            await db.collection("movies").drop();
            await db.collection("comments").drop();
        } catch (e) {

        }
    },

    closeCollection:async ()=>{
        const db=await dbConnection();
        db.close();
        console.log("You are no longer connected");
    }
};

