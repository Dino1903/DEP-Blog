document.addEventListener('DOMContentLoaded', () => {
    const profileArrow = document.querySelector('.profile-arrow');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    const profileMenu = document.querySelector('.profile-menu');

    profileArrow.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent click event from bubbling up
        profileMenu.classList.toggle('open');
    });

    // Close dropdown if click outside
    document.addEventListener('click', (event) => {
        if (!profileMenu.contains(event.target)) {
            dropdownMenu.classList.remove('open');
        }
    });
});
