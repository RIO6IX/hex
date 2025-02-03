document.addEventListener('DOMContentLoaded', () => {
    const popupBanner = document.getElementById('popupBanner');
    const popupClose = document.querySelector('.popup-close');

    // Show the banner after 3 seconds
    setTimeout(() => {
        popupBanner.style.display = 'flex';
    }, 3000);

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
