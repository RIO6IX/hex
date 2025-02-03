document.addEventListener('DOMContentLoaded', () => {
    const popupBanner = document.getElementById('popupBanner');
    const popupClose = document.querySelector('.popup-close');

  

    // Close popup when clicking the close button
    popupClose.addEventListener('click', () => {
        popupBanner.style.display = 'none';
    });

    // Close popup when clicking outside the content
    popupBanner.addEventListener('click', (event) => {
        if (event.target === popupBanner) {
            popupBanner.style.display = 'none';
        }
    });
});
