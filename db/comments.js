const uuidv4 = require("uuid/v4");
const mongoCollections = require("mongoCollections");
const comments = mongoCollections.comments;

async function addComment(user_id, movie_id, user_score, content) {
    if (typeof user_id !== "string")
        throw "No user provided";
    if (typeof movie_id !== "string")
        throw "No movie provided";
    if (typeof user_score !== "number")
        throw "You must provide a score";

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

    return await getCommentById(commentId);
}

async function updateComment(id, updatedComment) {
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
    return await getCommentById(id);
}

async function removeComment(id) {
    const commentCollection = await comments();
    const deleteInfo = await commentCollection.removeOne({_id: id});
    if (deleteInfo.deletedCount === 0) {
        throw `Could not delete comment ${id}`;
    }
}

async function getAllComments() {
    const commentCollection = comments();
    return await commentCollection.find().toArray();
}

async function getCommentById(id) {
    const commentCollection = comments();
    const comment = await commentCollection.findOne({_id: id});
    if (!comment)
        throw "Comment not found";
    return comment;
}