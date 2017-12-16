const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const passport = require('passport');
const strategy = require('passport-local').Strategy;
const session = require('express-session');
const flash = require('connect-flash');
const bcrypt = require("bcrypt");
const moviesAPI = require('./db/movies.js');
const usersAPI = require("./db/users.js");
const commentsAPI = require('./db/comments.js');
const app = express();


passport.use(new strategy(
    async (username, password, done) => {
        try {
            const user = await usersAPI.getUserByUsername(username);

            if (!user) {
                return done(null, false, {message: 'Incorrect username.'});
            }

            let isMatch = await bcrypt.compare(password, user.hashed_password);
            if (!isMatch) {
                return done(null, false, {message: 'Incorrect password.'});
            }
            return done(null, user);
        } catch (e) {
            return done(e);
        }
    })
);

passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(async (_id, done) => {
    const user = await usersAPI.getUserById(_id);
    try {
        done(null, user);
    } catch (e) {
        return done(e);
    }
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.render('body/homepage', {});
});

app.get("/logout", (req, res) => {
    req.logout();
    // log out and redirect to the root page/directory
    res.redirect("/");
});

app.post('/signup', async (req, res) => {
    if (req.body.password1 !== req.body.password2) {
        res.redirect('/signup_err');
    } else {
        console.log(req.body);
        try {
            const saltRounds = 4;
            let hashed_password = await bcrypt.hash(req.body.password1, saltRounds);
            await usersAPI.addUser(req.body.username, hashed_password, req.body.email, req.body.phone_num);
            console.log("Create user success!");
            res.render('body/private');
        } catch (e) {
            const user = await usersAPI.getUserByUsername(req.body.username);
            if (user) {
                res.redirect('/signup_err');
            }
        }
    }
});

app.get('/about', (req, res) => {
    res.render('about', {});
});

app.get('/search_movies_by_genre', async (req, res) => {
    try {
        const moviesList = await moviesAPI.getMovieByTitleFussyForCertainGenre(req.query.genre, req.query.key_word);
        let moviesJson = JSON.stringify(moviesList);
        console.log(moviesJson);
        res.send(moviesJson);
    } catch (e) {
        console.log(e);
        res.send({result: "Failed"});
    }
});


app.get('/show_movies_details', async (req, res) => {
    try {
        const movie = await moviesAPI.getMovieById(req.query.id);
        if (movie) {
            movie.image_url = movie.galleries[0];

            movie.avg_score = movie.avg_score * 12.4 + 'px';

            res.render('body/movie_description', {
                user: req.user,
                movie: movie,
                comments: await commentsAPI.getCommentByMovieId(movie._id)
            });

        }
    } catch (e) {
        res.send({"result": "failed"});
    }
});

app.get('/get_movies_by_genre', async (req, res) => {
    try {
        var moviesList = null;

        if (req.query.genre === 'all-type')
            moviesList = await moviesAPI.getAllMovies();
        else
            moviesList = await moviesAPI.getMovieByGenre(req.query.genre);
        console.log(moviesList);

        if (moviesList) {
            const moviesJson = JSON.stringify(moviesList);
            res.send(moviesJson);
        }
    } catch (e) {
        console.log(e);
        res.send({"result": "failed"});
    }
});

app.post('/add_to_fav', async (req, res) => {
    const user_id = req.body.user_id;
    const item_id = req.body.favorite;

    try {
        await usersAPI.addFavorite(user_id, item_id);
        res.send({"result": "SUCCESS"});
    } catch (e) {
        res.send({"result": "failed"});
    }
});

app.delete('/add_to_fav', async (req, res) => {
    const user_id = req.body.user_id;
    const item_id = req.body.favorite;

    try {
        await usersAPI.removeFavorite(user_id, item_id);
        res.send({"result": "SUCCESS"});
    } catch (e) {
        res.send({"result": "failed"});
    }
});

app.get('/signup_err', (req, res) => {
    res.render('body/signup_err', {});
});

app.post('/login', passport.authenticate('local', {
        successRedirect: '/private',
        failureRedirect: '/',
        failureFlash: true
    })
);

app.get('/private', (req, res) => {
    if (req.isAuthenticated()) res.render('body/private', {user: req.user});
    else res.render('body/homepage', {message: req.flash("error")});
});

app.get('/search', (req, res) => {
    if (req.user) res.render('body/search', {});
    else res.redirect('/');
});

app.get('/account_info', (req, res) => {
    if (req.user) {
        res.render('body/account_info', {user: req.user});
    } else {
        res.redirect("/");
    }
});

app.get('/favorites', async (req, res) => {
    if (req.user) {
        let moviesArray = [];
        for (let favorite of req.user.favorites) {
            let movie = await moviesAPI.getMovieById(favorite);
            moviesArray.push(movie);
        }
        req.user.favoriteObjects = moviesArray;

        res.render('body/favorites', {
            user: req.user,
            comments: await commentsAPI.getCommentByUserId(req.user._id)
        })
        ;
    } else {
        res.redirect("/");
    }
});


app.post('/comment_submit', async (req, res) => {

    let score = parseInt(req.body.movie_score);

    try {
        const comment = await commentsAPI.addComment(req.user._id, req.body.movie_id, score, req.body.content);
        const movie = await moviesAPI.addComment(req.body.movie_id, comment._id);
        const user = await usersAPI.addComment(req.user._id, comment._id);
        res.render('body/movie_description', {
            movie: movie,
            user: user,
            comments: await commentsAPI.getCommentByMovieId(movie._id)
        });
    }
    catch (e) {
        res.redirect("/");
    }
});

app.get('/comment_submit', async (req, res) => {
    res.redirect('/private', {});
});

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});