import { isAnchor, isHTMLElement } from "./typeguards.js";
export function downloadFile(filetype, data, filename) {
    const linkFile = document.querySelector(".real-file a");
    if (isAnchor(linkFile)) {
        if (!linkFile.href.includes("127.0.0.1")) {
            window.URL.revokeObjectURL(linkFile.href);
            linkFile.href = "";
        }
        ;
        const blob = new Blob([data], { type: filetype });
        const url = window.URL.createObjectURL(blob);
        linkFile.href = url;
        linkFile.download = filename;
    }
    ;
}
;
export function loadMessage(ano, temporada) {
    const loadMessage = document.querySelector(".file-loader .message");
    if (isHTMLElement(loadMessage)) {
        loadMessage.children[0].textContent = ano;
        loadMessage.children[1].textContent = temporada;
    }
}
export function setFileName(newName) {
    const fileName = document.querySelector(".real-file .icon-name > p");
    if (isHTMLElement(fileName)) {
        fileName.textContent = newName;
    }
}
//# sourceMappingURL=downloadableFile.js.map