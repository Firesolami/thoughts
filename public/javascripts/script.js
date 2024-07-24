document.addEventListener('DOMContentLoaded', () => {
    // Toggle navigation menu
    document.getElementById('hamburger').addEventListener('click', function() {
        var navMenu = document.getElementById('nav-menu');
        navMenu.classList.toggle('show');
    });

    // Close navigation menu when clicking outside
    document.addEventListener('click', function(event) {
        var navMenu = document.getElementById('nav-menu');
        var hamburger = document.getElementById('hamburger');
        if (!navMenu.contains(event.target) && !hamburger.contains(event.target)) {
            navMenu.classList.remove('show');
        }
    });

    // Redirect to home on header title click
    document.getElementById('header-title').addEventListener('click', () => {
        viewMessageDetails('/home');
    });

    // Handle post click
    const posts = document.querySelectorAll('.post');
    posts.forEach(post => {
        post.addEventListener('click', () => {
            const url = post.getAttribute('data-url');
            if (url) {
                viewMessageDetails(url);
            }
        });
    });
});

// Function to view message details
function viewMessageDetails(url) {
    window.location.href = url;
}
