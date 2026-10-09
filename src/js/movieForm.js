import {populateGenreDropDown} from "./components/movieGenreDopdown.js"
import {setMovieGenre} from "./components/movieGenreDopdown.js"
import {populateAgeRatingDropdown} from "./components/ageRatingDropdown.js"
import {setMovieRating} from "./components/ageRatingDropdown.js"

const form = document.getElementById("movieForm)");
const movieTitle = document.getElementById("title")
const description = document.getElementById("description")
const duration = document.getElementById("duration")
const genreSelect = document.getElementById("genre");
const ageRatingSelect = document.getElementById("ageRating");
const imdbRef = document.getElementById("imdbRef")
const btnCreateMovie = document.getElementById("btnCreate")
console.log(btnCreateMovie)



// --- create and post movie ---


function createMovie() {
   const movie = {};
    movie.movieName = movieTitle
    movie.description = description
    movie.duration = duration
    movie.genres = movieGenre
    return movie
}

function postMovie(movie) {
    // movie object to Json string
}

ageRatingSelect.addEventListener("change", setMovieRating)
genreSelect.addEventListener("change", setMovieGenre)
btnCreateMovie.addEventListener("click", postMovie)