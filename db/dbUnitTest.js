const movieData = require("./movies");
const userData = require("./users");
const commentData = require("./comments");
const mongoCollections = require("./mongoCollections");
const should = require("chai").should();

describe("db", function () {
    before(async function () {
        await mongoCollections.dropAllCollections();
        await mongoCollections.initCollections();
    });

    describe("user", function () {
        describe("add user", function () {
            it("add user with full parameters", async function () {
                const user1 = await userData.addUser("testuser1", "testuser1", "user1@gmail.com", "000-000-0000");
                user1.should.include({user_name: "testuser1"});
            });
            it("add user with limited parameters", async function () {
                const user2 = await userData.addUser("testuser2", "testuser2");
                user2.should.include({user_name: "testuser2"});
            });
        });

        describe("get user", function () {
            it("get user with user name", async function () {
                const user1 = await userData.getUserByUsername("testuser1");
                user1.should.include({user_name: "testuser1"});
            });
            it("get all users", async function () {
                const userList = await userData.getAllUsers();
                userList.should.have.length(2);
            })
        })
    });

    describe("movie", function () {
        describe("add movie", function () {
            it('add movie with full parameters', async function () {
                const movie1 = await movieData.addMovie("testmovie1", "1990-01-01", "d1", "R", ["a1"], ["Action"]);
                movie1.should.include({title: "testmovie1"});
            });
            it('add movie with limited parameters', async function () {
                const movie2 = await movieData.addMovie("testmovie2");
                movie2.should.include({title: "testmovie2"});
            });
        });
        describe("get movie", function () {
            it('get movie by title', async function () {
                const movie1 = await movieData.getMovieByTitle("testmovie1");
                movie1.should.include({title: "testmovie1"});
            });
            it('get movie by title fussy', async function () {
                const movieList = await movieData.getMovieByTitleFussy("2");
                movieList.should.have.length(1);
            });
            it("get movie by director", async function () {
                const movie1 = await movieData.getMovieByDirector("d1");
                movie1.should.have.length(1);
            });
            it('get movie by actor', async function () {
                const movieList = await movieData.getMovieByActor("a2");
                movieList.should.have.length(0);
            });
        });
        describe("add attributes", function () {
            it('add actor', async function () {
                let movie1 = await movieData.getMovieByTitle("testmovie1");
                movie1 = await movieData.addActor(movie1._id, "a2");
                movie1.actors.should.include("a2");
            });
        })
    });

    describe("comments", function () {
        describe("add comment", function () {
            it('add comment with full parameters', async function () {
                const user1 = await userData.getUserByUsername("testuser1");
                const movie1 = await movieData.getMovieByTitle("testmovie1");
                const comment1 = await commentData.addComment(user1._id, movie1._id, 5, "Good");
                comment1.should.include({
                    user_id: user1._id,
                    movie_id: movie1._id
                });
            });
            it('add comment with limited parameters', async function () {
                const user1 = await userData.getUserByUsername("testuser1");
                const movie2 = await movieData.getMovieByTitle("testmovie2");
                const comment2 = await commentData.addComment(user1._id, movie2._id, 0, null);
                comment2.should.include({
                    user_id: user1._id,
                    movie_id: movie2._id
                })
            });
        })
    });

    after(async function () {
        mongoCollections.closeCollection();
    });
});

