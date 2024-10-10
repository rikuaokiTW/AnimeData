import { isHTMLElement } from "./typeguards";
export default function switchToLoader() {
    const fileLoader = document.querySelector(".file-loader");
    const filePlaceholder = document.querySelector(".file-placeholder");
    const realFile = document.querySelector(".real-file");
    if (isHTMLElement(filePlaceholder) &&
        isHTMLElement(fileLoader) &&
        isHTMLElement(realFile)) {
        const valueDisplayP = window.getComputedStyle(filePlaceholder, null).display;
        const valueDisplayF = window.getComputedStyle(realFile, null).display;
        if (valueDisplayP == "block") {
            switchDisplay(filePlaceholder);
            switchDisplay(fileLoader, "flex");
        }
        else if (valueDisplayF == "block") {
            switchDisplay(realFile);
            switchDisplay(fileLoader, "flex");
        }
    }
}
//# sourceMappingURL=switchToLoader.js.map