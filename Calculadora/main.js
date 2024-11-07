let display = document.getElementById('display');

function appendToDisplay(value) {
    display.innerText += value;
}

function clearDisplay() {
    display.innerText = '';
}

function backspace() {
    display.innerText = display.innerText.slice(0, -1);
}

function calculateResult() {
    try {
        let expression = display.innerText.replace(/x/g, '*');
        display.innerText = eval(expression);
    } catch (error) {
        display.innerText = 'Error';
        setTimeout(clearDisplay, 1500);
    }
}

function calculatePercentage() {
    try {
        let value = parseFloat(display.innerText);
        if (!isNaN(value)) {
            display.innerText = value / 100;
        }
    } catch (error) {
        display.innerText = 'Error';
        setTimeout(clearDisplay, 1500);
    }
}