const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const passport = require('passport');
const strategy = require('passport-local').Strategy;
const session = require('express-session');
const flash = require('connect-flash');
const bcrypt = require("bcrypt");
const moviesAPI =require('./db/movies.js');
const usersAPI = require("./db/users.js");
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

passport.deserializeUser(async function (_id, done) {
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

app.get('/login', passport.authenticate('local', { failureFlash: 'Invalid username or password.', failureFlash: true}), (req, res) => {
    res.redirect('/private');
});

// app.get('/signup',(req,res)=>{
//     res.render('body/signup',{});  
// });

app.get("/logout", (req, res) => {
    req.logout();
    // log out and redirect to the root page/directory
    res.redirect("/");
});

// app.post('/signup', (req,res) => {
//     if (req.body.password1 != req.body.password2) res.redirect('/signup_err');
//     else {
//         users.getUserByUsername(req.body.username).then((user) => {
//             if (user) res.redirect('/signup_err');
//             else {
//                 users.createUser(req.body.username,req.body.password1,req.body.email,req.body.phone_num);
//                 res.redirect('/private');
//             }
//         });
//     }
// });

app.post('/signup', async (req, res) => {
    if (req.body.password1 != req.body.password2) {
        res.redirect('/signup_err');
    } else {
        try {
            await usersAPI.addUser(req.body.username, req.body.password1, req.body.email, req.body.phone_num);
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

app.get('/movie_genre', async (req, res) => {
    var genre = "comedy";
	const moviesList = await moviesAPI.getMovieByGenre(genre);
    if (moviesList) {
    	for(var i = 0;i < moviesList.length; i++){
    		
		 	moviesList[i].rating = moviesList[i].avg_score * 12.4 + 'px';


		 	moviesList[i].image_url = moviesList[i].galleries[0];
		 	
		 	console.log(i + ":" + moviesList[i].image_url);
		}
		
        res.render('body/movie_description', moviesList[0]);
    }
});

app.get('/signup_err', (req, res) => {
    res.render('body/signup_err', {});
});

app.post('/login', passport.authenticate('local', { failureFlash: 'Invalid username or password.', failureFlash: true}), (req, res) => {
    res.redirect('/private');
});

app.get('/private', (req, res) => {
    if (req.user) res.render('body/private', {user: req.user});
    else res.redirect('/');
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
})

app.get('/favorites', (req, res) => {
    if (req.user) {
        res.render('body/favorites', {user: req.user});
    } else {
        res.redirect("/");
    }
})

app.post('/result', (req, res) => {
    if (req.body.filter == "Name") {
        api.GetFilmByName(req.body.keyword).then((film) => {
            if (film.length != 0) res.render('body/result', {film: film});
            else res.render('body/result_err', {});
        });
    }
    else if (req.body.filter == "Director") {
        api.GetFilmByDirector(req.body.keyword).then((film) => {
            if (film.length != 0) res.render('body/result', {film: film});
            else res.render('body/result_err', {});
        });
    }
    else if (req.body.filter == "Release Year") {
        api.GetFilmByReleaseYear(req.body.keyword).then((film) => {
            if (film.length != 0) res.render('body/result', {film: film});
            else res.render('body/result_err', {});
        });
    }
    else if (req.body.filter == "Score") {
        api.GetFilmByScore(req.body.keyword).then((film) => {
            if (film.length != 0) res.render('body/result', {film: film});
            else res.render('body/result_err', {});
        });
    }
    else if (req.body.filter == "Actor") {
        api.GetFilmByActor(req.body.keyword).then((film) => {
            if (film.length != 0) res.render('body/result', {film: film});
            else res.render('body/result_err', {});
        });
    }
    else if (req.body.filter == "Film Type") {
        api.GetFilmByFilmType(req.body.keyword).then((film) => {
            if (film.length != 0) res.render('body/result', {film: film});
            else res.render('body/result_err', {});
        });
    }
});

app.post('/comment', (req, res) => {
    api.GetFilmByNo(req.body.index).then((film) => {
        res.render('body/comment', {film: film, user: req.user});
    });
});

app.post('/comment_submit', (req, res) => {
    api.AddComment(req.body.film_name, req.user.username, req.body.content).then((film) => {
        res.render('body/comment', {film: film, user: req.user});
    });
});

app.post('/score_submit', (req, res) => {
    api.GiveScore(req.body.film_name, req.body.score).then((film) => {
        res.json(film);
    });
});

app.post('/add_to_fav', (req, res) => {
    api.AddtoFav(req.user.username, req.body.film_name).then((film) => {
        res.render('body/comment', {film: film, user: req.user});
    });
});

app.use(async (req, res, next) => {
    var err = new Error('File Not Found');
    err.status = 404;
    await next(err);
});

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});