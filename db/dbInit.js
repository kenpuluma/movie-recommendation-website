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

    await mongoCollections.closeCollection();
}

main();