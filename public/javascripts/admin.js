document.addEventListener('DOMContentLoaded', () => {
    // Highlight section based on hash
    const hash = window.location.hash.substring(1);
    if (hash) {
        const section = document.getElementById(hash);
        if (section) {
            section.classList.add('highlight');
            setTimeout(() => {
                section.classList.remove('highlight');
            }, 5000);
        }
    }
});

