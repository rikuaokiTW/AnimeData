import { isHTMLElement } from "./typeguards.js";

const fileLoader = document.querySelector(".file-loader");
const filePlaceholder = document.querySelector(".file-placeholder");
const realFile = document.querySelector(".real-file");

export function switchDisplay(element: HTMLElement, display = "block") {
    const ativo = window.getComputedStyle(element, null).display;
    if(ativo != "none") {
        element.style.display = "none";
    } else {
        element.style.display = display;
    };
};

export function switchToLoader() {
    if(
        isHTMLElement(filePlaceholder) &&
        isHTMLElement(fileLoader) &&
        isHTMLElement(realFile)
    ) {
        const valueDisplayP = window.getComputedStyle(filePlaceholder, null).display;
        const valueDisplayF = window.getComputedStyle(realFile, null).display;

        if(valueDisplayP == "block") {
            switchDisplay(filePlaceholder);
            switchDisplay(fileLoader, "flex");
        } else if(valueDisplayF == "block") {
            switchDisplay(realFile);
            switchDisplay(fileLoader, "flex");
        };
    };
};

export function switchToFIle() {
    if(
        isHTMLElement(filePlaceholder) &&
        isHTMLElement(fileLoader) &&
        isHTMLElement(realFile)
    ) {
        if(fileLoader.style.display != "none") {
            switchDisplay(fileLoader);
            switchDisplay(realFile);
        };
    };
};