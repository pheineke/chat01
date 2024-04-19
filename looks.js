document.addEventListener("DOMContentLoaded", function() {
    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (isDarkMode) {
        document.body.style.color = 'white';
        document.body.style.background = 'black'
        document.getElementById('main').style.backgroundColor = '#000';
        document.getElementById('styleChat').style.backgroundColor = '#333'; // Dunkle Hintergrundfarbe für die erste DIV-Box
        document.getElementById('styleChat').style.color = '#fff'
        document.getElementById('output').style.color = '#fff'
        document.getElementById('styleInput').style.backgroundColor = '#333'; // Dunkle Hintergrundfarbe für die zweite DIV-Box
        document.getElementById('textInput').style.backgroundColor = '#666';
        document.getElementById('textInput').style.border = '#666';
    }
});