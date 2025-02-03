document.addEventListener("DOMContentLoaded", () => {
    const button = document.querySelector(".ctf-button");

    if (button) {
        button.addEventListener("click", (event) => {
            event.preventDefault();
            alert("Redirecting to How to Play page...");
            window.location.href = button.getAttribute("href");
        });
    }
});
