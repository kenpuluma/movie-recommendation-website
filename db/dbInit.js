const movieData = require("./movies");
const mongoCollections = require("./mongoCollections");

async function main() {

    await mongoCollections.dropAllCollections();
    await mongoCollections.initCollections();

    let movie = await movieData.addMovie("It", "2017", "Andy Muschietti", "R", ["Jaeden Lieberher", "Bill Skarsgård"], ["drama", "fantasy", "horror", "thriller"]);
    await movieData.addGallery(movie._id, "https://image.tmdb.org/t/p/original/9E2y5Q7WlCVNEhP5GiVTjhEhx1o.jpg");

    movie = await movieData.addMovie("Jumanji", "1995", "Joe Johnston", "PG", ["Robin Williams"], ["adventure", "fantasy", "family"]);
    await movieData.addGallery(movie._id, "https://image.tmdb.org/t/p/original/8wBKXZNod4frLZjAKSDuAcQ2dEU.jpg");

    movie = await movieData.addMovie("Thor: Ragnarok", "2017", "Taika Waititi", "PG-13", ["Chris Hemsworth", "Tom Hiddleston"], ["action", "comedy" , "adventure", "science-fiction", "fantasy"]);
    await movieData.addGallery(movie._id, "https://image.tmdb.org/t/p/original/oSLd5GYGsiGgzDPKTwQh7wamO8t.jpg");

    movie = await movieData.addMovie("Justice League", "2017", "Zack Snyder", "PG-13", ["Ben Affleck", "Henry Cavill", "Amy Adams", "Gal Gadot"], ["action", "science-fiction" + "adventure", "fantasy"]);
    await movieData.addGallery(movie._id, "https://image.tmdb.org/t/p/original/9rtrRGeRnL0JKtu9IMBWsmlmmZz.jpg");
    await movieData.addGallery(movie._id, "https://image.tmdb.org/t/p/original/ikATbf6RVR4GdRrQ4OJo9K5bmV3.jpg");
    await movieData.addGallery(movie._id, "https://image.tmdb.org/t/p/original/aQkEdqaXVxYObMLeoBSAUcgkxLs.jpg");

    movie = await movieData.addMovie("Minions", "2015", "Pierre Coffin", "PG", undefined, ["adventure", "animation", "comedy", "family"]);
    await movieData.addGallery(movie._id, "https://image.tmdb.org/t/p/original/q0R4crx2SehcEEQEkYObktdeFy.jpg");
    await movieData.addGallery(movie._id, "https://image.tmdb.org/t/p/original/s5uMY8ooGRZOL0oe4sIvnlTsYQO.jpg");

    movie = await movieData.addMovie("Coco", "2017", "Lee Unkrich", "PG", undefined, ["adventure", "animation", "family"]);
    await movieData.addGallery(movie._id, "https://image.tmdb.org/t/p/original/eKi8dIrr8voobbaGzDpe8w0PVbC.jpg");
    await movieData.addGallery(movie._id, "https://image.tmdb.org/t/p/original/6Ryitt95xrO8KXuqRGm1fUuNwqF.jpg");

    movie = await movieData.addMovie("Sleight", "2017", "J.D. Dillard", "R", ["Jacob Latimore", "Seychelle Gabriel"], ["drama", "thriller", "action", "science-fiction"]);
    await movieData.addGallery(movie._id, "https://image.tmdb.org/t/p/original/wridRvGxDqGldhzAIh3IcZhHT5F.jpg");

    movie = await movieData.addMovie("Daddy's Home 2", "2017", "Sean Anders", "PG-13", ["Will Ferrell", "Mark Wahlberg"], ["drama", "comedy"]);
    await movieData.addGallery(movie._id, "https://image.tmdb.org/t/p/original/rF2IoKL0IFmumEXQFUuB8LajTYP.jpg");

    movie = await movieData.addMovie("Happy Death Day", "2017", "Christopher B. Landon", "PG-13", ["Jessica Rothe"], ["horror"]);
    await movieData.addGallery(movie._id, "https://image.tmdb.org/t/p/original/cTaEIUYTt52ooq9quVbAQ7NpGwo.jpg");

    movie = await movieData.addMovie("Murder on the Orient Express", "2017", "Kenneth Branagh", "PG-13", ["Kenneth Branagh", "Penélope Cruz"], ["crime", "drama", "mystery"]);
    await movieData.addGallery(movie._id, "https://image.tmdb.org/t/p/original/iBlfxlw8qwtUS0R8YjIU7JtM6LM.jpg");
    //------------------------------------------------------------//------------------------------------------------------------//------------------------------------------------------------
    //------------------------------------------------------------//------------------------------------------------------------//------------------------------------------------------------
    movie = await movieData.addMovie("Blue Collar Comedy Tour", "2003-03-28", "C.B. Harding", "PG-13", [" Jeff Foxworthy", "Bill Engvall"], ["comedy", "musical", "performing-art"]);
    await movieData.addGallery(movie._id, "https://image.tmdb.org/t/p/w640/zQuIy4JZitU3DjYGUTrAv1C7eJD.jpg");
    
    movie = await movieData.addMovie("Zootopia", "2016-03-04", "Byron Howard", "PG-13", ["Ginnifer Goodwin", "Jason Bateman"], ["comdey", "anime"]);
    await movieData.addGallery(movie._id, "https://image.tmdb.org/t/p/w640/hGNapPGoFz65oFws9Z062SAWeKj.jpg");

    movie = await movieData.addMovie("La La Land", "2016-09-02", "Damien Chazelle", "PG", ["Ryan Gosling", "Emma Stone"], ["comedy", "musicla"]);
    await movieData.addGallery(movie._id, "https://image.tmdb.org/t/p/w640/89hie0f1egidjIYGWgA1lM5U15.jpg");

    movie = await movieData.addMovie("Demain tout commence", "2016-12-07", "Hugo Gélin", "PG-13", ["Omar Sy ", "Clémence Poésy"], ["comedy"]);
    await movieData.addGallery(movie._id, "https://image.tmdb.org/t/p/w640/cccDkCqbhUkxq1qxhqL8EBiKZLm.jpg");

    movie = await movieData.addMovie("Finding Dory", "2016-06-08", "Andrew Stanton", "PG", ["Ellen DeGeneres", "Albert Brooks"], ["comdey", "anime"]);
    await movieData.addGallery(movie._id, "https://image.tmdb.org/t/p/original/iBlfxlw8qwtUS0R8YjIU7JtM6LM.jpg");
    //------------------------------------------------------------//------------------------------------------------------------//------------------------------------------------------------

    movie = await movieData.addMovie("Deepwater Horizon", "2016-09-30", "Matthew Sand", "R", ["Mark Wahlberg", "Kurt Russell"], ["disaster", "action"]);
    await movieData.addGallery(movie._id, "https://image.tmdb.org/t/p/w640/8Ef1qecVcBydg9n8MjKthvs540u.jpg");

    movie = await movieData.addMovie("터널", "2016-08-26", "Kim Seong-hoon", "PG-13", ["Ha Jung-woo", "Bae Doona"], ["disaster", "mystery"]);
    await movieData.addGallery(movie._id, "https://image.tmdb.org/t/p/w640/bHmk6FULCcNlwKyaE0GSJqAx3dp.jpg");

    movie = await movieData.addMovie("판도라", "2016-12-07", "Park Jung-woo", "R", ["Kim Nam-gil", "Moon Jeong-hee"], ["disaster", "action"]);
    await movieData.addGallery(movie._id, "https://image.tmdb.org/t/p/w640/2vpmWXCuNfFMwlvIfmQpRQDMIFP.jpg");

    movie = await movieData.addMovie("2 Lava 2 Lantula!", "2016-08-06", "Nick Simon", "PG", ["Michael Winslow", "Lorynn York"], ["crime", "disaster", "thriller"]);
    await movieData.addGallery(movie._id, "https://image.tmdb.org/t/p/w640/lV0jb1qU0JqJwzPHj4jMirFBse9.jpg");

    movie = await movieData.addMovie("My Entire High School Sinking Into the Sea", "2016-09-23", "Dash Shaw", "PG-13", ["Jason Schwartzman", "Lena Dunham"], ["disaster", "anime", "mystery"]);
    await movieData.addGallery(movie._id, "https://image.tmdb.org/t/p/w640/j3hcw7faHyIlVBixdgNMkLW6CzT.jpg");
//------------------------------------------------------------//------------------------------------------------------------//------------------------------------------------------------
    movie = await movieData.addMovie("Boyka: Undisputed IV", "2016-09-22", "Todor Chapkanov", "R", ["Scott Adkins", "Teodora Duhovnikova"], ["crime", "thriller", "action"]);
    await movieData.addGallery(movie._id, "https://image.tmdb.org/t/p/w640/7QGdIJWWTkPhVjpQ0zA6z69khod.jpg");

    movie = await movieData.addMovie("I.T.", "2016-09-23", "Daniel Kay", "R", ["Pierce Brosnan", "Stefanie Scott"], ["crime", "drama", "thriller"]);
    await movieData.addGallery(movie._id, "https://image.tmdb.org/t/p/w640/46BJXoEkwu10dcZJ0psrLtCCBTP.jpg");

    movie = await movieData.addMovie("Hell or High Water", "2016-08-22", "Taylor Sheridan", "R", ["Jeff Bridges", "Chris Pine"], ["crime",  "thriller"]);
    await movieData.addGallery(movie._id, "https://image.tmdb.org/t/p/w640/po9mxoT7oYkdlsemeC1TxRy8M5i.jpg");

    movie = await movieData.addMovie("The Nice Guys", "2016-05-20", "Shane Black", "R", ["Russell Crowe", "Angourie Rice"], ["crime", "comdey", "mystery"]);
    await movieData.addGallery(movie._id, "https://image.tmdb.org/t/p/w640/rKGU5icujhHYctEC86BdMzFPUjq.jpg");

    movie = await movieData.addMovie("War Dogs", "2016-08-19", "Todd Phillips", "R", ["Ana de Armas", "Miles Teller"], ["crime", "comdey"]);
    await movieData.addGallery(movie._id, "https://image.tmdb.org/t/p/w640/sUgQD6TjcC9SBPVistzqlq85iKY.jpg");
//------------------------------------------------------------//------------------------------------------------------------//------------------------------------------------------------
    movie = await movieData.addMovie("Hacksaw Ridge", "2016-11-04", "Andrew Knight", "PG", ["Andrew Garfield", "Sam Worthington"], ["war", "history"]);
    await movieData.addGallery(movie._id, "https://image.tmdb.org/t/p/w640/8jpY9GzRO1vj9i8QFWz1WNxd6dm.jpg");

    movie = await movieData.addMovie("Anthropoid", "2016-08-12", "Sean Ellis", "PG", ["Charlotte Le Bon", "Jamie Dornan"], ["war", "history", "thriller"]);
    await movieData.addGallery(movie._id, "https://image.tmdb.org/t/p/w640/3JlvAtz02FMVzXPKpyyFO2F3u8k.jpg");

    movie = await movieData.addMovie("Allied", "206-11-23", "Robert Zemeckis", "R", ["Brad Pitt", "Marion Cotillard"], ["war", "action"]);
    await movieData.addGallery(movie._id, "https://image.tmdb.org/t/p/w640/6LRT0tT3lyQviDOEb8IR4J9No2e.jpg");

    movie = await movieData.addMovie("USS Indianapolis: Men of Courage", "2017-01-24", "Mario Van Peebles", "R", ["Nicolas Cage", "Tom Sizemore"], ["war", "action"]);
    await movieData.addGallery(movie._id, "https://image.tmdb.org/t/p/w640/kLzOqLE3JyarkaRrtlDBLt8Orlx.jpg");

    movie = await movieData.addMovie("Free State of Jones", "2016-06-24", "Gary Ross", "PG-13", ["Matthew McConaughey", "Gugu Mbatha-Raw"], ["war", "action", "history"]);
    await movieData.addGallery(movie._id, "https://image.tmdb.org/t/p/w640/dSg0YVQaD5wsyKC8Y0qxxCtIgJr.jpg");
//------------------------------------------------------------//------------------------------------------------------------//------------------------------------------------------------

    movie = await movieData.addMovie("11.22.63", "2016-02-15", "James Kent", "R", ["James Franco", "Chris Cooper"], ["horror", "history", "murder"]);
    await movieData.addGallery(movie._id, "https://image.tmdb.org/t/p/w640/5EJGeeuPy19EGDy8HErpbHba0yq.jpg");

    movie = await movieData.addMovie("Ghosthunters ", "2016-07-05", "Pearry Reginald Teo", "R", ["Liz Fenning", "Anna Harr"], ["horror", "murder"]);
    await movieData.addGallery(movie._id, "https://image.tmdb.org/t/p/w640/rSfv9HaRD6iPoN8F8gpHPLivE9b.jpg");

    movie = await movieData.addMovie("ClownTown", "2016-06-04", "Tom Nagel", "R", ["Brian Nagel", "Tom Nagel"], ["horror", "clown"]);
    await movieData.addGallery(movie._id, "https://image.tmdb.org/t/p/w640/cpOFmB6CGpS1J3B52rVd6mMgzo1.jpg");

    movie = await movieData.addMovie("Spidarlings", "2017-07-01", "Salem Kapsaski", "R", ["Lloyd Kaufman", "Rusty Goffe"], ["horror", "gay"]);
    await movieData.addGallery(movie._id, "https://image.tmdb.org/t/p/w640/85D1BQK3GPyXB3cHFaPCuWBLaqK.jpg");

    movie = await movieData.addMovie("Don't Hug Me I'm Scared 6", "2016-06-19", "Becky Sloan", "R", [" Joseph Pelling ", " Baker Terry"], ["horror", "musical"]);
    await movieData.addGallery(movie._id, "https://image.tmdb.org/t/p/w640/tDXzUBVFVLzGgs1lnhLGkhMGtGp.jpg");
//------------------------------------------------------------//------------------------------------------------------------//------------------------------------------------------------

    movie = await movieData.addMovie("Captain America: Civil War", "2016-04-12", "Joe Russo", "PG-13", ["Chris Evans", "Scarlett Johansson"], ["science-fiction", "action", "adventure"]);
    await movieData.addGallery(movie._id, "https://image.tmdb.org/t/p/w640/cyyTjHW0oemFgJYE7Gyx5yxbFbs.jpg");

    movie = await movieData.addMovie("Doctor Strange", "2016-11-04", "Scott Derrickson", "PG-13", ["Benedict Cumberbatch", "Chiwetel Ejiofor"], ["science-fiction", "drama", "mystery"]);
    await movieData.addGallery(movie._id, "https://image.tmdb.org/t/p/w640/iiDuKsfkRMSyzBio4KZgMkeOQUU.jpg");

    movie = await movieData.addMovie("Rogue One: A Star Wars Story", "2016-12-10", "Gareth Edwards", "PG-13", ["Felicity Jones", "Diego Luna"], ["science-fiction", "war", "space-travel"]);
    await movieData.addGallery(movie._id, "https://image.tmdb.org/t/p/w640/7ngxzN59KxuTIZNcI8199R5UPa3.jpg");

    movie = await movieData.addMovie("Batman v Superman: Dawn of Justice", "2016-03-25", "Zack Snyder", "PG-13", ["Ben Affleck", "Henry Cavill"], ["science-fiction", "action", "superhero"]);
    await movieData.addGallery(movie._id, "https://image.tmdb.org/t/p/w640/8WZR2215Z8TgTubvGZR5fDOJLxg.jpg");

    movie = await movieData.addMovie("君の名は。", "2016-06-13", "Makoto Shinkai", "PG-13", ["Ryunosuke Kamiki", "Mone Kamishiraishi"], ["science-fiction", "anime","romantics"]);
    await movieData.addGallery(movie._id, "https://image.tmdb.org/t/p/w640/vpQxNHhS6BxmwKiWoUUPancE4mV.jpg");

//------------------------------------------------------------//------------------------------------------------------------//------------------------------------------------------------

    movie = await movieData.addMovie("아가씨", "2016-09-22", "Park Chan-wook", "PG-13", ["Kim Min-hee", "Kim Tae-Ri"], ["romantics"]);
    await movieData.addGallery(movie._id, "https://image.tmdb.org/t/p/w640/2ZVjJeRJid9EIJB9RiwwyFwvCnj.jpg");

    movie = await movieData.addMovie("Paterson", "2016-12-28", "Jim Jarmusch", "PG-13", ["Adam Driver", "Golshifteh Farahani"], ["romantics", "comedy"]);
    await movieData.addGallery(movie._id, "https://image.tmdb.org/t/p/w640/AuJ1ZlfqwuAr9H5Qr1U9KILylse.jpg");

    movie = await movieData.addMovie(" The Girl on the Train", "2016-10-04", "Tate Taylor", "PG-13", ["Emily Blunt", "Haley Bennett"], ["romantics", "crime"]);
    await movieData.addGallery(movie._id, "https://image.tmdb.org/t/p/w640/iiIhAaam7VlcLLBwpE9qCeOerVM.jpg");

    movie = await movieData.addMovie("Me casé con un boludo ", "2016-03-07", "Juan Taratuto", "PG-13", ["Adrián Suar", "Valeria Bertuccelli"], ["romantics", "comedy"]);
    await movieData.addGallery(movie._id, "https://image.tmdb.org/t/p/w640/defQhNwpJp0QFnmxHwWBUIQwnB2.jpg");

    movie = await movieData.addMovie(" Swiss Army Man", "2016-01-22", "Dan Kwan", "PG-13", ["Paul Dano", "Daniel Radcliffe"], ["romantics", "comedy"]);
    await movieData.addGallery(movie._id, "https://image.tmdb.org/t/p/w640/9BdJz7b4WdJul0KVu42YFEgqzyp.jpg");


//------------------------------------------------------------//------------------------------------------------------------//------------------------------------------------------------

    movie = await movieData.addMovie(" Assassin's Creed", "2016-12-21", "Justin Kurzel", "PG-13", ["Michael Fassbender", "Marion Cotillard"], ["action","assassin"]);
    await movieData.addGallery(movie._id, "https://image.tmdb.org/t/p/w640/g5RBWljRhqe9SzxVdw7cGVcxhJX.jpg");

    movie = await movieData.addMovie("부산행", "2016-05-13", "Yeon Sang-Ho", "PG-13", ["Gong Yoo", "Ma Dong-seok"], ["action", "horror"]);
    await movieData.addGallery(movie._id, "https://image.tmdb.org/t/p/w640/emPnrJeRnAhzNOpr3drY5803sve.jpg");

    movie = await movieData.addMovie(" The Magnificent Seven", "2016-09-23", "Antoine Fuqua", "PG-13", ["Denzel Washington", "Chris Pratt"], ["action", "adventure"]);
    await movieData.addGallery(movie._id, "https://image.tmdb.org/t/p/w640/zSZZLGiMDCSo8trlFe5Diw22rHS.jpg");

    movie = await movieData.addMovie(" X-Men: Apocalypse ", "2016-05-21", "Bryan Singer", "PG-13", ["James McAvoy", "Valeria Bertuccelli"], ["action", "adventure","science-fiction"]);
    await movieData.addGallery(movie._id, "https://image.tmdb.org/t/p/w640/uhsUNLMerD7SKqC5XtjUbuhQjTU.jpg");

    movie = await movieData.addMovie("  Underworld: Blood Wars", "2017-01-06", "Cory Goodman", "R", ["Kate Beckinsale", "Theo James"], ["action", "science-fiction","horror"]);
    await movieData.addGallery(movie._id, "https://image.tmdb.org/t/p/w640/vD2XUVUm9enYhp232oL6R0TaCPL.jpg");



    await mongoCollections.closeCollection();
}

main();