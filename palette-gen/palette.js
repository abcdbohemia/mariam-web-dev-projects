function generateRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i=0; i<6; i++) {
color += letters[Math.floor(Math.random()* 16)];
    }
    return color;
}
function getContrastColor(hexColor) {
    const r = parseInt(hexColor.substring(1,3), 16);
    const g = parseInt(hexColor.substring(3,5), 16);
    const b = parseInt(hexColor.substring(5,7), 16);
    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
    return luminance > 128? '#000000' : '#FFFFFF';
}
function applyColors() {
    const swatches = document.querySelectorAll('.color-swatch');
    swatches.forEach(swatch => {const randomColor = generateRandomColor();
        swatch.style.backgroundColor = randomColor;
        swatch.textContent = randomColor;
        swatch.style.color = getContrastColor(randomColor);
    });
}
const generateButton = document.getElementById('generate-button');
generateButton.addEventListener('click', applyColors);
applyColors();