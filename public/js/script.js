document.addEventListener('DOMContentLoaded', function () {
    const burgerMenu = document.querySelector('.burger-menu');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    burgerMenu.addEventListener('click', function () {
        burgerMenu.classList.toggle('active');
        dropdownMenu.classList.toggle('active');
    });
});
