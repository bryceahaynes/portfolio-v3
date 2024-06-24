const words = ["Developer", "Designer", "Professional",];
let wordIndex = 0;
let letterIndex = 0;
let currentWord = words[wordIndex];
let isDeleting = false;
const typewriter = document.getElementById('typewriter');

function type() {
    typewriter.innerHTML = currentWord.substring(0, letterIndex);

    if (!isDeleting && letterIndex < currentWord.length) {
        letterIndex++;
        setTimeout(type, 100);
    } else if (isDeleting && letterIndex > 0) {
        letterIndex--;
        setTimeout(type, 100);
    } else if (!isDeleting && letterIndex === currentWord.length) {
        setTimeout(() => {
            isDeleting = true;
            type();
        }, 1500);
    } else if (isDeleting && letterIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        currentWord = words[wordIndex];
        setTimeout(type, 150);
    }
}

function startTypewriter() {
    type();
}

startTypewriter();




document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('#navbar a');

    function updateNavigation() {
        const scrollPosition = window.scrollY + window.innerHeight / 2; // Adjusted to take the middle of the viewport
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');

            let progress = 0;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                progress = (scrollPosition - sectionTop) / sectionHeight;
            } else if (scrollPosition >= sectionTop + sectionHeight) {
                progress = 1;
            }

            const correspondingLink = document.querySelector(`#navbar a[data-section="${sectionId}"]`);
            if (correspondingLink) {
                correspondingLink.style.setProperty('--underline-width', `${progress * 100}%`);
            }

            // Handle last section
            if (index === sections.length - 1 && scrollPosition + windowHeight >= documentHeight - 50) {
                correspondingLink.style.setProperty('--underline-width', '100%');
            }
        });
    }

    window.addEventListener('scroll', updateNavigation);
    updateNavigation(); // Call once on load to set initial state
});
