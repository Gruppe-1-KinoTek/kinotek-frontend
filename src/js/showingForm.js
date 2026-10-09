if (sessionStorage.getItem("role") !== "Admin") location.href = "login.html";

import { fetchMovies } from "./api/movieApi.js";
import { fetchAuditoriums, postShowing } from "./api/showingApi.js";
import { fillSelect } from "./components/formSelect.js";
import { renderNav } from "./components/nav.js";
renderNav();

const form = document.querySelector("#showing-form");
const movieSelect = document.querySelector("#inputMovie");
const auditoriumSelect = document.querySelector("#inputAuditorium");
const status = document.querySelector("#form-status");

init();

async function init() {
    try {
        const [movies, auditoriums] = await Promise.all([fetchMovies(), fetchAuditoriums()]);
        fillSelect(movieSelect, movies, "movieName", "movieName");
        fillSelect(auditoriumSelect, auditoriums, "name", "name");
        form.addEventListener("submit", handleSubmit);
    } catch (err) {
        console.error(err);
        showStatus("Kunne ikke hente film og sale.");
    }
}

function createShowing() {
    const data = new FormData(form);
    return {
        movie: data.get("movie"),
        auditorium: data.get("auditorium"),
        dateTime: data.get("dateTime"),
    };
}

async function handleSubmit(event) {
    event.preventDefault();
    const button = event.submitter;
    button.disabled = true;
    try {
        await postShowing(createShowing());
        showStatus("Forestillingen er oprettet.");
        form.reset();
    } catch (err) {
        console.error(err);
        showStatus(err.message);
    } finally {
        button.disabled = false;
    }
}

function showStatus(text) {
    status.value = text;
}