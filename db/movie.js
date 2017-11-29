const uuidv4 = require("uuid/v4");
const mongoCollections = require("mongoCollections");
const movies = mongoCollections.movies;

async function addMovie(title, released_date, director, rating, actors, genres) {
    if (typeof title !== "string")
        throw "No title provided";
    if (!Array.isArray(actors))
        actors = [];
    if (!Array.isArray(genres))
        genres = [];

    let newMovie = {
        _id: uuidv4(),
        title: title,
        released_date: released_date,
        director: director,
        rating: rating,
        actors: actors,
        genres: genres
    };

    const movieCollection = await movies();
    const newInsertInfo = await movieCollection.insertOne(newMovie);
    const movieId = await newInsertInfo.insertId;

    return await getMovieById(movieId);
}

async function updateMovie(id, updatedMovie) {
    const movieCollection = await movies();

    let updatedMovieData = {};
    if (updatedMovie.title) {
        updatedMovieData.title = updatedMovie.title;
    }
    if (updatedMovie.released_date) {
        updatedMovieData.released_date = updatedMovie.released_date;
    }
    if (updatedMovie.director) {
        updatedMovieData.director = updatedMovie.director;
    }
    if (updatedMovie.rating) {
        updatedMovieData.rating = updatedMovie.rating;
    }
    if (updatedMovie.actors) {
        updatedMovieData.actors = updatedMovie.actors;
    }
    if (updatedMovie.genres) {
        updatedMovieData.genres = updatedMovie.genres;
    }
    if (updatedMovie.title) {
        updatedMovieData.title = updatedMovie.title;
    }
    if (updatedMovie.gallarys) {
        updatedMovieData.gallarys = updatedMovie.gallarys;
    }
    if (updatedMovie.comments) {
        updatedMovieData.comments = updatedMovie.comments;
    }

    let updateCommand = {
        $set: updatedMovieData
    };

    await movieCollection.updateOne({_id: id}, updateCommand);
    return await getMovieById(id);
}

async function removeMovie(id) {
    const movieCollection = await movies();
    const deleteInfo = await movieCollection.removeOne({_id: id});
    if (deleteInfo.deletedCount === 0) {
        throw `Could not delete movie ${id}`;
    }
}

async function getAllMovies() {
    const movieCollection = movies();
    return await movieCollection.find().toArray();
}

async function getMovieById(id) {
    const movieCollection = movies();
    const movie = await movieCollection.findOne({_id: id});
    if (!movie)
        throw "Movie not found";
    return movie;
}

