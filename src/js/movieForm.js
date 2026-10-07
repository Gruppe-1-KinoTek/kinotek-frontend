const form = document.getElementById("movieForm)");
const genreSelect = document.getElementById("genre");
const ageRatingSelect = document.getElementById("ageRating");
const btnCreateMovie = document.getElementById("btnCreate")
console.log(btnCreateMovie)

//const urlMovie = "http://localhost:8080/movie/create" //fix url's when backend is deployed
const urlGenre = "http://localhost:8080/genre/get"

//move this into movieApi?
let fetchedGenres
async function genresFetch(){
    fetchedGenres = await fetch(urlGenre)
}

//fill dropdown with objects of genres fetched from api
function fillDropdownGenres(item) {
    const element = document.createElement("option")
    element.textContent = item.genreName
    element.value = item.id
    genreSelect.appendChild(element)
}

function addGenresToDD() {
    fetchedGenres.forEach(fillDropdownGenres)
}

fillDropdownGenres()


function postMovie() {
    
}

btnCreateMovie.addEventListener("click", )