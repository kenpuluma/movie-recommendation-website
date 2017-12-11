const movieData = require("./movies");
const userData = require("./users");
const commentData = require("./comments");
const mongoCollections = require("./mongoCollections");

async function main() {
    mongoCollections.dropAllCollections();
    mongoCollections.initCollections();
    console.log(await userData.addUser("testuser1", "testuser1", "user1@gmail.com", "000-000-0000"));
    console.log(await userData.addUser("testuser2", "testuser2"));

    let user1 = await userData.getUserByUsername("testuser1");
    console.log(user1);
    user1 = await userData.getUserById(user1._id);
    console.log(user1);
}

main();