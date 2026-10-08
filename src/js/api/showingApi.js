import { API_BASE_URL } from "../config.js";
const showingId = 8;

export async function fetchSeatMap(showingId) {
    const seatMap = await getJson(`/api/showing/${showingId}/seat-map`)
    return { ...seatMap, rows: groupSeatsByRow(seatMap.seats)}
}

export async function postBooking(showingId, seatIds) {
    const res = await fetch(`${API_BASE_URL}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ showingId, seatIds }),
    });
    if (!res.ok) throw new Error(`Booking fejlede: ${res.status}`);
    return res.json();
}

function groupSeatsByRow(seats) {
    const rows = new Map();
    for (const seat of seats) {
        if (!rows.has(seat.seatRowId)) {
            rows.set(seat.seatRowId, { rowLetter: seat.seatRowLetter, seats: [] });
        }
        rows.get(seat.seatRowId).seats.push(seat);
    }
    return [...rows.values()];
}

async function getJson(path) {
    const res = await fetch(`${API_BASE_URL}${path}`);
    if (!ros.ok) throw new Error(`GET ${path} fejlede: ${res.status}`);
    return res.json();
}