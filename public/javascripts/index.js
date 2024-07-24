document.addEventListener('DOMContentLoaded', () => {
    // Handle action buttons
    const navigationButtons = document.querySelectorAll('.navigate');
    navigationButtons.forEach(button => {
        button.addEventListener('click', () => {
            const url = button.getAttribute('data-url');
            window.location.href = url;
        });
    });
});

