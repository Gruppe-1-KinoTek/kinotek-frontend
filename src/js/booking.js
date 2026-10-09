import { fetchSeatMap, postBooking } from "./api/showingApi.js";
import { renderSeatMap } from "./components/seatPicker.js";

const form = document.querySelector("#seat-form");
//const showingId = new URLSearchParams(location.search).get("showing");


init();

async function init() {
    const seatMap = await fetchSeatMap(showingId);
    document.querySelector("#movie-title").textContent = seatMap.movieName;
    renderSeatMap(document.querySelector("#seat-map"), seatMap);
    form.addEventListener("change", updateSummary);
    form.addEventListener("submit", handleSubmit);
}

function createBookingRequest() {
    const formData = new FormData(form);
    return {
        showingId: Number(showingId),
        seatIds: formData.getAll("seat").map(Number),
        email: formData.get("email").trim(),
    };
}

function selectedSeatIds() {
    return new FormData(form).getAll("seat").map(Number);
}

function updateSummary() {
    const count = selectedSeatIds().length;
    document.querySelector("#selection-summary").value =
        count === 0 ? "No seats selected" : `${count} seat(s) selected`;
}

async function handleSubmit(event) {
    event.preventDefault();
    const button = event.submitter;
    const request = createBookingRequest();

    if (request.seatIds.length === 0) {
        showMessage("Vælg mindst ét sæde");
        return;
    }

    button.disabled = true;
    try {
        const confirmation = await postBooking(request);
        renderConfirmation(confirmation);
    } catch (err) {
        showMessage(err.message);
        button.disabled = false;
        // sædet kan være taget af en anden imens → hent sædekortet igen
        renderSeatMap(document.querySelector("#seat-map"), await fetchSeatMap(showingId));
    }
}

// TODO: Nedenstående message og confirmation er lidt hacked. Lad os erstatte dette med ægte html navigation.

function showMessage(text) {
    document.querySelector("#selection-summary").value = text;
}

function renderConfirmation(c) {
    const seats = c.bookedSeats
        .map(s => `${s.seatRowLetter}${s.seatNumber}`)
        .join(", ");
    const time = new Date(c.showingDateTime).toLocaleString("da-DK", {
        dateStyle: "full", timeStyle: "short",
    });

    const section = document.createElement("section");
    section.innerHTML = `
        <h2>Tak for din booking!</h2>
        <p>Ordrenummer: <strong>${c.invoiceId}</strong></p>
        <p>${c.movieName} · ${c.auditoriumName}</p>
        <p>${time}</p>
        <p>Sæder: ${seats}</p>`;
    form.replaceWith(section);
}