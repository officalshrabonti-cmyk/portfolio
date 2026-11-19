// Simple welcome message or interactive alert on load
console.log("Welcome to Shrabonti Dash's Portfolio Website!");

document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".project-card");
    cards.forEach(card => {
        card.addEventListener("click", () => {
            alert(`You clicked on: ${card.querySelector("h3").innerText}`);
        });
    });
});