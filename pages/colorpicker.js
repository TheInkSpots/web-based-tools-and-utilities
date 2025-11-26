document.addEventListener('DOMContentLoaded', () => {
    const colorBox = document.getElementById('color-box');
    const hexInput = document.getElementById('hexInput');
    const rgbInput = document.getElementById('rgbInput');
    const hslInput = document.getElementById('hslInput');
    const hueSlider = document.getElementById('hue-slider');
    const saturationSlider = document.getElementById('saturation-slider');
    const lightnessSlider = document.getElementById('lightness-slider');

    let currentColor = tinycolor('#3B82F6');

    function updateUI(from) {
        const hex = currentColor.toHexString();
        const rgb = currentColor.toRgbString();
        const hsl = currentColor.toHslString();
        const hslColor = currentColor.toHsl();

        colorBox.style.backgroundColor = hex;

        if (from !== 'hex') {
            hexInput.value = hex;
        }
        if (from !== 'rgb') {
            rgbInput.value = rgb;
        }
        if (from !== 'hsl') {
            hslInput.value = hsl;
        }
        if (from !== 'sliders') {
            hueSlider.value = hslColor.h;
            saturationSlider.value = hslColor.s * 100;
            lightnessSlider.value = hslColor.l * 100;
        }
    }

    hexInput.addEventListener('input', (e) => {
        const newColor = tinycolor(e.target.value);
        if (newColor.isValid()) {
            currentColor = newColor;
            updateUI('hex');
        }
    });

    rgbInput.addEventListener('input', (e) => {
        const newColor = tinycolor(e.target.value);
        if (newColor.isValid()) {
            currentColor = newColor;
            updateUI('rgb');
        }
    });

    hslInput.addEventListener('input', (e) => {
        const newColor = tinycolor(e.target.value);
        if (newColor.isValid()) {
            currentColor = newColor;
            updateUI('hsl');
        }
    });

    hueSlider.addEventListener('input', (e) => {
        const hsl = currentColor.toHsl();
        hsl.h = e.target.value;
        currentColor = tinycolor(hsl);
        updateUI('sliders');
    });

    saturationSlider.addEventListener('input', (e) => {
        const hsl = currentColor.toHsl();
        hsl.s = e.target.value / 100;
        currentColor = tinycolor(hsl);
        updateUI('sliders');
    });

    lightnessSlider.addEventListener('input', (e) => {
        const hsl = currentColor.toHsl();
        hsl.l = e.target.value / 100;
        currentColor = tinycolor(hsl);
        updateUI('sliders');
    });

    updateUI();
});
