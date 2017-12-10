const uuidv4 = require("uuid/v4");
const mongoCollections = require("mongoCollections");
const users = mongoCollections.users;

async function addUser(user_name, hashed_password, email, phone) {
    if (typeof user_name !== "string" || typeof hashed_password !== "string")
        throw "Username or password is not recognized";

    let newUser = {
        _id: uuidv4(),
        user_name: user_name,
        hashed_password: hashed_password,
        profile: {
            email: email,
            phone: phone
        },
        comments: [],
        favorites: []
    };

    const userCollection = await users();
    const newInsertInfo = await userCollection.insertOne(newUser);
    const userId = await newInsertInfo.insertedId;

    return await getUserById(userId);
}

async function addComment(id, comment_id) {
    if (typeof comment_id !== "string")
        throw "Invalid comment id";

    const userCollection = await users();
    const oldUser = await getUserById(id);

    let updatedUserData = {
        comments: oldUser.comments
    };
    updatedUserData.comments.push(comment_id);

    let updateCommand = {
        $set: updatedUserData
    };
    await userCollection.updateOne({_id: id}, updateCommand);
    return await getUserById(id);
}

async function addFavorite(id, movie_id) {
    if (typeof movie_id !== "string")
        throw "Invalid movie id";

    const userCollection = await users();
    const oldUser = await getUserById(id);

    let updatedUserData = {
        favorites: oldUser.favorites
    };
    updatedUserData.favorites.push(movie_id);

    let updateCommand = {
        $set: updatedUserData
    };
    await userCollection.updateOne({_id: id}, updateCommand);
    return await getUserById(id);
}

async function updateUser(id, updatedUser) {
    const userCollection = await users();

    let updatedUserData={};
    if(updatedUser.user_name){
        updatedUserData.user_name=updatedUser.user_name;
    }
    if(updatedUser.hashed_password){
        updatedUserData.hashed_password=updatedUser.hashed_password;
    }
    if(updatedUser.profile.email){
        updatedUserData.profile.email=updatedUser.profile.email;
    }
    if(updatedUser.profile.phone){
        updatedUserData.profile.phone=updatedUser.profile.phone;
    }
    if(updatedUser.comments){
        updatedUserData.comments=updatedUser.comments;
    }
    if(updatedUser.favorites){
        updatedUserData.favorites=updatedUser.favorites;
    }

}

async function removeUser(id) {
    const userCollection = await users();
    const deleteInfo = await userCollection.removeOne({_id: id});
    if (deleteInfo.deletedCount === 0) {
        throw `Could not delete user ${id}`;
    }
}

async function getAllUsers() {
    const userCollection = users();
    return await userCollection.find().toArray();
}

async function getUserById(id) {
    const userCollection = users();
    const user = await userCollection.findOne({_id: id});
    if (!user)
        throw "User not found";
    return user;
}