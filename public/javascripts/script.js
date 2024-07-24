// Toggle navigation menu
document.getElementById('hamburger').addEventListener('click', function() {
    console.log('Hamburger clicked'); // Log statement to check click event
    var navMenu = document.getElementById('nav-menu');
    navMenu.classList.toggle('.hidden');
});

function viewMessageDetails(url) {
    window.location.href = url;
}