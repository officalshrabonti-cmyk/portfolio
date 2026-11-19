const tempInput = document.getElementById('temp-input');
const fromUnit = document.getElementById('from-unit');
const toUnit = document.getElementById('to-unit');
const convertBtn = document.getElementById('convert-btn');
const resultBox = document.getElementById('result-box');

function checkFields() {
    if (tempInput.value.trim() !== '' && fromUnit.value !== '' && toUnit.value !== '') {
        convertBtn.removeAttribute('disabled');
    } else {
        convertBtn.setAttribute('disabled', 'true');
    }
}

tempInput.addEventListener('input', checkFields);
fromUnit.addEventListener('change', checkFields);
toUnit.addEventListener('change', checkFields);

convertBtn.addEventListener('click', () => {
    const temp = parseFloat(tempInput.value);
    const from = fromUnit.value;
    const to = toUnit.value;
    let result = 0;

    if (from === to) {
        result = temp;
    } else if (from === 'Celsius') {
        if (to === 'Fahrenheit') result = (temp * 9/5) + 32;
        if (to === 'Kelvin') result = temp + 273.15;
    } else if (from === 'Fahrenheit') {
        if (to === 'Celsius') result = (temp - 32) * 5/9;
        if (to === 'Kelvin') result = (temp - 32) * 5/9 + 273.15;
    } else if (from === 'Kelvin') {
        if (to === 'Celsius') result = temp - 273.15;
        if (to === 'Fahrenheit') result = (temp - 273.15) * 9/5 + 32;
    }

    resultBox.textContent = `${temp} ${from} is ${result.toFixed(1)} ${to}`;
    resultBox.style.display = 'block';
});
