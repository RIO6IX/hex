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

// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Get the popup modal element and the close button
    const popupModal = document.getElementById('popupModal');
    const popupClose = document.querySelector('.popup-close');
  
    // Function to show the modal
    function showPopupModal() {
      popupModal.style.display = 'block';
    }
  
    // Function to close the modal
    function closePopupModal() {
      popupModal.style.display = 'none';
    }
  
    // Show the popup modal 3 seconds after page load
    setTimeout(showPopupModal, 3000);
  
    // Close the modal when the close button is clicked
    popupClose.addEventListener('click', closePopupModal);
  
    // Optional: Close the modal when clicking outside the popup content
    window.addEventListener('click', (event) => {
      if (event.target === popupModal) {
        closePopupModal();
      }
    });
  });
  


  document.addEventListener("DOMContentLoaded", function () {
    let links = document.querySelectorAll("nav a");
    let currentPage = window.location.pathname;

    links.forEach(link => {
        if (link.href.includes(currentPage)) {
            link.classList.add("active");
        }
    });
});
