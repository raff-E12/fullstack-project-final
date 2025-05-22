const selectMovies = `SELECT 
    movies.*, AVG(reviews.vote) AS average_vote
    FROM
        movies
    LEFT JOIN reviews ON movies.id = movie_id`
const selectSingleMovie = `${selectMovies} WHERE movie_id = ?`
const insertReviews = `INSERT INTO reviews (name, vote, text, movie_id) VALUES (?, ?, ?, ?)`

const selectReviews = `SELECT * FROM reviews WHERE movie_id = ?`

const insertMovie = `INSERT INTO movies (title,  director, genre, release_year, abstract, image) VALUES (?, ?, ?, ?, ?, ?)`;

module.exports = {
   selectMovies,
   insertReviews,
   selectReviews,
   insertMovie,
   selectSingleMovie
}