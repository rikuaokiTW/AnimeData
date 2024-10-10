"use strict";
const fromSlider = document.querySelector('#fromSlider');
const toSlider = document.querySelector('#toSlider');
const fromInput = document.querySelector('#fromInput');
const toInput = document.querySelector('#toInput');
function isInput(value) {
    return value instanceof HTMLInputElement;
}
function getParsed(currentFrom, currentTo) {
    const from = parseInt(currentFrom.value, 10);
    const to = parseInt(currentTo.value, 10);
    return [from, to];
}
function controlFromInput(fromSlider, fromInput, toInput, controlSlider) {
    const [from, to] = getParsed(fromInput, toInput);
    fillSlider(fromInput, toInput, '#C6C6C6', '#25daa5', controlSlider);
    if (from > to) {
        fromSlider.valueAsNumber = to;
        fromInput.valueAsNumber = to;
    }
    else {
        fromSlider.valueAsNumber = from;
    }
}
function controlToInput(toSlider, fromInput, toInput, controlSlider) {
    const [from, to] = getParsed(fromInput, toInput);
    fillSlider(fromInput, toInput, '#C6C6C6', '#25daa5', controlSlider);
    setToggleAccessible(toInput);
    if (from <= to) {
        toSlider.valueAsNumber = to;
        toInput.valueAsNumber = to;
    }
    else {
        toInput.valueAsNumber = from;
    }
}
function controlFromSlider(fromSlider, toSlider, fromInput) {
    const [from, to] = getParsed(fromSlider, toSlider);
    fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
    if (from > to) {
        fromSlider.valueAsNumber = to;
        fromInput.valueAsNumber = to;
    }
    else {
        fromInput.valueAsNumber = from;
    }
}
function controlToSlider(fromSlider, toSlider, toInput) {
    const [from, to] = getParsed(fromSlider, toSlider);
    fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
    setToggleAccessible(toSlider);
    if (from <= to) {
        toSlider.valueAsNumber = to;
        toInput.valueAsNumber = to;
    }
    else {
        toInput.valueAsNumber = from;
        toSlider.valueAsNumber = from;
    }
}
function fillSlider(from, to, sliderColor, rangeColor, controlSlider) {
    const rangeDistance = Number(to.max) - Number(to.min);
    const fromPosition = from.valueAsNumber - Number(to.min);
    const toPosition = to.valueAsNumber - Number(to.min);
    controlSlider.style.background = `linear-gradient(
      to right,
      ${sliderColor} 0%,
      ${sliderColor} ${(fromPosition) / (rangeDistance) * 100}%,
      ${rangeColor} ${((fromPosition) / (rangeDistance)) * 100}%,
      ${rangeColor} ${(toPosition) / (rangeDistance) * 100}%, 
      ${sliderColor} ${(toPosition) / (rangeDistance) * 100}%, 
      ${sliderColor} 100%)`;
}
function setToggleAccessible(currentTarget) {
    const toSlider = document.querySelector('#toSlider');
    if (Number(currentTarget.value) <= 0) {
        toSlider?.setAttribute('style', 'zIndex = 2');
    }
    else {
        toSlider?.setAttribute('style', 'zIndex = 0');
    }
}
if (isInput(fromSlider) && isInput(toSlider)) {
    fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
    setToggleAccessible(toSlider);
}
if (fromSlider instanceof HTMLElement &&
    toSlider instanceof HTMLElement &&
    fromInput instanceof HTMLElement &&
    toInput instanceof HTMLElement &&
    isInput(fromSlider) && isInput(toSlider) &&
    isInput(fromInput) && isInput(toInput)) {
    fromSlider.oninput = () => controlFromSlider(fromSlider, toSlider, fromInput);
    toSlider.oninput = () => controlToSlider(fromSlider, toSlider, toInput);
    fromInput.oninput = () => controlFromInput(fromSlider, fromInput, toInput, toSlider);
    toInput.oninput = () => controlToInput(toSlider, fromInput, toInput, toSlider);
}
//# sourceMappingURL=sliders.js.map