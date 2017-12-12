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
        });

        describe('updateUser', function () {
            it('update user with user object', async function () {
                let updatedUser2 = await userData.getUserByUsername("testuser2");
                updatedUser2.profile.email = "user2@gmail.com";
                const user2 = await userData.updateUser(updatedUser2._id, updatedUser2);
                user2.profile.should.include({
                    email: "user2@gmail.com"
                })
            });
            it('remove user by id', async function () {
                let user2 = await userData.getUserByUsername("testuser2");
                await userData.removeUserById(user2._id);
                let userList = await userData.getAllUsers();
                userList.should.have.length(1);
                await userData.addUser("testuser2", "testuser2");
            });
            it('remove user by user name', async function () {
                await userData.removeUserByUsername("testuser2");
                let userList = await userData.getAllUsers();
                userList.should.have.length(1);
                await userData.addUser("testuser2", "testuser2");
            });
        });
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
            it('get movie by genre', async function () {
                const movieList = await movieData.getMovieByGenre("Action");
                movieList.should.have.length(1);
            });
            it('get movie by rating', async function () {
                const movieList = await movieData.getMovieByRating("R");
                movieList.should.have.length(1);
            });
            it('get all movies', async function () {
                const movieList = await movieData.getAllMovies();
                movieList.should.have.length(2);
            });
        });
        describe("add attributes", function () {
            it('add actor', async function () {
                let movie1 = await movieData.getMovieByTitle("testmovie1");
                movie1 = await movieData.addActor(movie1._id, "a2");
                movie1.actors.should.include("a2");
            });
            it('add genre', async function () {
                let movie2 = await movieData.getMovieByTitle("testmovie2");
                movie2 = await movieData.addGenre(movie2._id, "Romantic");
                movie2.genres.should.include("Romantic");
            });
            it('add gallery', async function () {
                let movie1 = await movieData.getMovieByTitle("testmovie1");
                movie1 = await movieData.addGallery(movie1._id, "/img1.jpg");
                movie1.galleries.should.include("/img1.jpg");
            });
        });
        describe('remove attributes', function () {
            it('remove actor', async function () {
                let movie1 = await movieData.getMovieByTitle("testmovie1");
                movie1 = await movieData.removeActor(movie1._id, "a2");
                movie1.actors.should.have.length(1);
            });
            it('remove genre', async function () {
                let movie2 = await movieData.getMovieByTitle("testmovie2");
                movie2 = await movieData.removeGenre(movie2._id, "Romantic");
                movie2.genres.should.have.length(1);
            });
            it('remove gallery', async function () {
                let movie1 = await movieData.getMovieByTitle("testmovie1");
                movie1 = await movieData.removeGallery(movie1._id, "/img1.jpg");
                movie1.galleries.should.have.length(1);
            });
        });
        describe('remove movie', function () {
            it('remove movie by id', async function () {
                const movie1 = await movieData.getMovieByTitle("testmovie2");
                await movieData.removeMovieById(movie1._id);
                let movieList = await movieData.getAllMovies();
                movieList.should.have.length(1);
                await movieData.addMovie("testmovie2");
            });
            it('remove movie by title', async function () {
                await movieData.removeMovieByTitle("testmovie2");
                let movieList = await movieData.getAllMovies();
                movieList.should.have.length(1);
                await movieData.addMovie("testmovie2");
            });
        });
        describe('update movie', function () {
            it('update movie with object', async function () {
                let updatedMovie2 = await movieData.getMovieByTitle("testmovie2");
                updatedMovie2.director = "d2";
                const movie2 = await movieData.updateMovie(updatedMovie2._id, updatedMovie2);
                movie2.should.include({director: "d2"});
            });
        });
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
                const user2 = await userData.getUserByUsername("testuser2");
                const movie1 = await movieData.getMovieByTitle("testmovie1");
                const comment2 = await commentData.addComment(user2._id, movie1._id, 0, null);
                comment2.should.include({
                    user_id: user2._id,
                    movie_id: movie1._id
                })
            });
        })
    });

    describe("user interact", function () {
        describe("user favorite", function () {
            it('add favorite to user', async function () {
                let user1 = await userData.getUserByUsername("testuser1");
                const movie1 = await movieData.getMovieByTitle("testmovie1");
                user1 = await userData.addFavorite(user1._id, movie1._id);
                user1.favorites.should.have.length(1);
            });
            it('remove favorite from user', async function () {
                let user1 = await userData.getUserByUsername("testuser1");
                const movie1 = await movieData.getMovieByTitle("testmovie1");
                user1 = await userData.removeFavorite(user1._id, movie1._id);
                user1.favorites.should.have.length(0);
            });
        });
        describe('user comment', function () {
            it('add comment to user', async function () {
                let user1 = await userData.getUserByUsername("testuser1");
                const movie1 = await movieData.getMovieByTitle("testmovie1");
                const comment1 = await commentData.getCommentByUserAndMovieId(user1._id, movie1._id);
                user1 = await userData.addComment(user1._id, comment1._id);
                user1.comments.should.have.length(1);
            });
            it('remove comment from user', async function () {
                let user1 = await userData.getUserByUsername("testuser1");
                user1 = await userData.removeComment(user1._id, user1.comments[0]);
                user1.comments.should.have.length(0);
            });
        });

    });

    describe('movie interact', function () {
        describe('movie comment', function () {
            it('add comment to movie', async function () {
                const user1 = await userData.getUserByUsername("testuser1");
                let movie1 = await movieData.getMovieByTitle("testmovie1");
                const comment1 = await commentData.getCommentByUserAndMovieId(user1._id, movie1._id);
                movie1=await movieData.addComment(movie1._id,comment1._id);
                movie1.comments.should.have.length(1);
            });
            it('add comment to movie', async function () {
                const user2 = await userData.getUserByUsername("testuser2");
                let movie1 = await movieData.getMovieByTitle("testmovie1");
                const comment2 = await commentData.getCommentByUserAndMovieId(user2._id, movie1._id);
                movie1=await movieData.addComment(movie1._id,comment2._id);
                movie1.avg_score.should.equal(2.5);
            });
            it('get movie over avg score 2', async function () {
                const movieList=await movieData.getMovieOverScore(2);
                movieList.should.have.length(1);
            });
        });
    });

    after(async function () {
        mongoCollections.closeCollection();
    });
});

