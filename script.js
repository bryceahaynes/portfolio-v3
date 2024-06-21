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