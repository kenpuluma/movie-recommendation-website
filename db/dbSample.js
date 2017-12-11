const movieData = require("./movies");
const userData = require("./users");
const commentData = require("./comments");
const mongoCollections = require("./mongoCollections");

async function main() {
    await mongoCollections.dropAllCollections();
    await mongoCollections.initCollections();

    console.log(await userData.addUser("testuser1", "testuser1", "user1@gmail.com", "000-000-0000"));
    console.log(await userData.addUser("testuser2", "testuser2"));

    let user1 = await userData.getUserByUsername("testuser1");
    console.log(user1);
    user1 = await userData.getUserById(user1._id);
    console.log(user1);
    console.log(await userData.getAllUsers());

    console.log(await movieData.addMovie("testmovie1","1990-01-01","d1","R",["a1"],["Action"]));
    console.log(await movieData.addMovie("testmovie2"));

    let movie1=await movieData.getMovieByTitle("testmovie1");
    console.log(movie1);
    movie1=await movieData.getMovieByDirector("d1");
    console.log(movie1);
    movie1=await movieData.addActor(movie1[0]._id,"a2");
    console.log(movie1);
    let movieList1=await movieData.getMovieByActor("a2");
    console.log(movieList1);
    movieList1=await movieData.getMovieByTitleFussy("2");
    console.log(movieList1);

    user1=await userData.getUserByUsername("testuser1");
    movie1=await movieData.getMovieByTitle("testmovie1");
    console.log(await commentData.addComment(user1._id,movie1._id,5,"Good"));
    console.log(await commentData.addComment(user1._id,movie1._id,0,null));

    mongoCollections.closeCollection();
}

main();
