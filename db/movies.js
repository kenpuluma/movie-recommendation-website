const uuidv4 = require("uuid/v4");
const mongoCollections = require("./mongoCollections");
const movies = mongoCollections.movies;
const comments = require("./comments");

module.exports.addMovie = async (title, released_date, director, rating, actors, genres) => {
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
        avg_score: 0,
        actors: actors,
        genres: genres,
        galleries: [],
        comments: []
    };

    const movieCollection = await movies();
    const newInsertInfo = await movieCollection.insertOne(newMovie);
    const movieId = await newInsertInfo.insertedId;

    return await this.getMovieById(movieId);
};

module.exports.addActor = async (id, actor) => {
    if (typeof actor !== "string")
        throw "Invalid actor";

    const movieCollection = await movies();
    const oldMovie = await this.getMovieById(id);

    let updatedMovieData = {
        actors: oldMovie.actors
    };
    updatedMovieData.actors.push(actor);

    let updateCommand = {
        $set: updatedMovieData
    };
    await movieCollection.updateOne({_id: id}, updateCommand);
    return await this.getMovieById(id);
};

module.exports.addGenre = async (id, genre) => {
    if (typeof genre !== "string")
        throw "Invalid genre";

    const movieCollection = await movies();
    const oldMovie = await this.getMovieById(id);

    let updatedMovieData = {
        genres: oldMovie.genres
    };
    updatedMovieData.genres.push(genre);

    let updateCommand = {
        $set: updatedMovieData
    };
    await movieCollection.updateOne({_id: id}, updateCommand);
    return await this.getMovieById(id);
};

module.exports.addGallery = async (id, gallery_path) => {
    if (typeof gallery_path !== "string")
        throw "Invalid path";

    const movieCollection = await movies();
    const oldMovie = await this.getMovieById(id);

    let updatedMovieData = {
        galleries: oldMovie.galleries
    };
    updatedMovieData.galleries.push(gallery_path);

    let updateCommand = {
        $set: updatedMovieData
    };
    await movieCollection.updateOne({_id: id}, updateCommand);
    return await this.getMovieById(id);
};

module.exports.addComment = async (id, comment_id) => {
    if (typeof comment_id !== "string")
        throw "Invalid comment id";

    const movieCollection = await movies();
    const oldMovie = await this.getMovieById(id);

    let updatedMovieData = {
        comments: oldMovie.comments
    };
    updatedMovieData.comments.push(comment_id);

    let total_score = 0;
    for (let comment_id of updatedMovieData.comments) {
        const comment = comments.getCommentById(comment_id);
        total_score += comment.user_score;
    }
    updatedMovieData.avg_score = total_score / updatedMovieData.comments.length;

    let updateCommand = {
        $set: updatedMovieData
    };
    await movieCollection.updateOne({_id: id}, updateCommand);
    return await this.getMovieById(id);
};

module.exports.updateMovie = async (id, updatedMovie) => {
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
        let total_score = 0;
        for (let comment_id of updatedMovie.comments) {
            const comment = comments.getCommentById(comment_id);
            total_score += comment.user_score;
        }
        updatedMovieData.avg_score = total_score / updatedMovie.comments.length;
    }

    let updateCommand = {
        $set: updatedMovieData
    };

    await movieCollection.updateOne({_id: id}, updateCommand);
    return await this.getMovieById(id);
};

module.exports.removeMovie = async (id) => {
    const movieCollection = await movies();
    const deleteInfo = await movieCollection.removeOne({_id: id});
    if (deleteInfo.deletedCount === 0) {
        throw `Could not delete movie ${id}`;
    }
};

module.exports.getAllMovies = async () => {
    const movieCollection = await movies();
    return await movieCollection.find().toArray();
};

module.exports.getMovieById = async (id) => {
    const movieCollection = await movies();
    const movie = await movieCollection.findOne({_id: id});
    if (!movie)
        throw "Movie not found";
    return movie;
};

module.exports.getMovieByTitle = async (title) => {
    const movieCollection = await movies();
    const movie = await movieCollection.findOne({title: title});
    if (!movie)
        throw "Movie not found";
    return movie;
};

module.exports.getMovieByTitleFussy = async (title) => {
    const movieCollection = await movies();
    const movieList = await movieCollection.find({title: new RegExp(title)}).toArray();
    if (!movieList)
        throw "Movie not found";
    return movieList;
};

module.exports.getMovieByActor = async (actor) => {
    const movieCollection = await movies();
    const movieList = await movieCollection.find({
        actors: {
            "$in": [actor]
        }
    }).toArray();
    if (!movieList)
        throw "Movie not found";
    return movieList;
};

module.exports.getMovieByDirector = async (director) => {
    const movieCollection = await movies();
    const movieList = await movieCollection.find({director: director}).toArray();
    if (!movieList)
        throw "Movie not found";
    return movieList;
};

module.exports.getMovieByGenre = async (genre) => {
    const movieCollection = await movies();
    const movieList = await movieCollection.find({
        genres: {
            "$in": [genre]
        }
    }).toArray();
    if (!movieList)
        throw "Movie not found";
    return movieList;
};

module.exports.getMovieByRating = async (rating) => {
    const movieCollection = await movies();
    const movieList = await movieCollection.find({rating: rating}).toArray();
    if (!movieList)
        throw "Movie not found";
    return movieList;
};

module.exports.getMovieOverScore = async (score) => {
    const movieCollection = await movies();
    const movieList = await movieCollection.find({
        avg_score: {$gte: score}
    }).toArray();
    if (!movieList)
        throw "Movie not found";
    return movieList;
};
