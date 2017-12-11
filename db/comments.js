const uuidv4 = require("uuid/v4");
const mongoCollections = require("./mongoCollections");
const comments = mongoCollections.comments;
const users = require("./users");
const movies = require("./movies");

module.exports.addComment = async (user_id, movie_id, user_score, content) => {
    if (typeof user_id !== "string")
        throw "No user provided";
    if (typeof movie_id !== "string")
        throw "No movie provided";
    if (typeof user_score !== "number" || user_score < 0 || user_score > 5)
        throw "You must provide a valid score";

    let newComment = {
        _id: uuidv4(),
        user_id: user_id,
        movie_id: movie_id,
        user_score: user_score,
        content: content
    };

    const commentCollection = await comments();
    const newInsertInfo = await commentCollection.insertOne(newComment);
    const commentId = await newInsertInfo.insertedId;

    return await this.getCommentById(commentId);
};

module.exports.updateComment = async (id, updatedComment) => {
    const commentCollection = await comments();

    let updatedCommentData = {};
    if (updatedComment.user_score) {
        updatedCommentData.user_score = updatedComment.user_score;
    }
    if (updatedComment.content) {
        updatedCommentData.content = updatedComment.content;
    }

    let updateCommand = {
        $set: updatedCommentData
    };
    await commentCollection.updateOne({_id: id}, updateCommand);
    return await this.getCommentById(id);
};

module.exports.removeComment = async (id) => {
    const commentCollection = await comments();
    const deleteInfo = await commentCollection.removeOne({_id: id});
    if (deleteInfo.deletedCount === 0) {
        throw `Could not delete comment ${id}`;
    }
};

module.exports.getAllComments = async () => {
    const commentCollection = await comments();
    return await commentCollection.find().toArray();
};

module.exports.getCommentById = async (id) => {
    const commentCollection = await comments();
    const comment = await commentCollection.findOne({_id: id});
    if (!comment)
        throw "Comment not found";
    return comment;
};

module.exports.getCommentByUserId = async (user_id) => {
    const commentCollection = await comments();
    const commentList = await commentCollection.find({user_id: user_id}).toArray();
    if (!commentList)
        throw "Comment not found";
    return commentList;
};

module.exports.getCommentByUserName = async (user_name) => {
    const user = users.getUserByUsername(user_name);
    return this.getCommentByUserId(user._id);
};

module.exports.getCommentByMovieId = async (movie_id) => {
    const commentCollection = await comments();
    const commentList = await commentCollection.find({movie_id: movie_id}).toArray();
    if (!commentList)
        throw "Comment not found";
    return commentList;
};

module.exports.getCommentByMovieTitle = async (movie_title) => {
    const movie = movies.getMovieByTitle(movie_title);
    return this.getCommentByMovieId(movie._id);
};
