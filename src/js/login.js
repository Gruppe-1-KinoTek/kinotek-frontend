import { login } from "./api/employeeApi.js";
import { renderNav } from "./components/nav.js";
renderNav();

const form = document.querySelector("#login-form");
const status = document.querySelector("#login-status");

form.addEventListener("submit", handleSubmit);

async function handleSubmit(event) {
    event.preventDefault();
    const button = event.submitter;
    const data = new FormData(form);
    button.disabled = true;
    try {
        if (await login(data.get("name").trim(), data.get("password"))) {
            location.href = "../index.html";
            return;
        }
        status.value = "Forkert brugernavn eller adgangskode.";
    } catch (err) {
        console.error(err);
        status.value = "Kunne ikke kontakte serveren.";
    }
    button.disabled = false;
}