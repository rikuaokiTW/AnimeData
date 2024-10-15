import executeFetch from "./executeFetch.js";
import { isHTMLElement } from "./typeguards.js";
export function initButton() {
    const downloadButton = document.querySelector("div.button > button");
    if (downloadButton) {
        downloadButton.addEventListener('click', executeFetch);
    }
    ;
}
;
export function toggleButton() {
    const downloadButton = document.querySelector("div.button > button");
    if (isHTMLElement(downloadButton)) {
        downloadButton.classList.toggle('disabled');
        if (!downloadButton.classList.contains('disabled')) {
            downloadButton.addEventListener('click', executeFetch);
        }
        else {
            downloadButton.removeEventListener('click', executeFetch);
        }
        ;
    }
    ;
}
;
//# sourceMappingURL=button.js.map