const display = document.getElementById('display');

function appendValue(value) {
    if (display.value === '0' && value !== '.') {
        display.value = value;
    } else {
        display.value += value;
    }
}

function clearDisplay() {
    display.value = '0';
}

function deleteLast() {
    if (display.value.length > 1) {
        display.value = display.value.slice(0, -1);
    } else {
        display.value = '0';
    }
}

function calculateResult() {
    try {
        if (display.value) {
            display.value = eval(display.value);
        }
    } catch (error) {
        display.value = 'Error';
    }
}
