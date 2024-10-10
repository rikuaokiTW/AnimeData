export default function switchDisplay(element, display = "block") {
    const ativo = window.getComputedStyle(element, null).display;
    if (ativo != "none") {
        element.style.display = "none";
    }
    else {
        element.style.display = display;
    }
}
//# sourceMappingURL=switchDisplay.js.map