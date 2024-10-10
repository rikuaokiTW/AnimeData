import { switchToLoader, switchToFIle } from "./switchingElements.js";
import { isAnchor, isHTMLElement } from "./typeguards.js";

export function downloadFile(filetype: string, data: string, filename: string) {
    const linkFile = document.querySelector(".real-file a");
    /* const button = document.querySelector("button");
    const file = document.querySelector(".file");
    const fileLoader = document.querySelector(".file-loader");
    const filePlaceholder = document.querySelector(".file-placeholder");
    const realFile = document.querySelector(".real-file");
    
    const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
    const stest = ["winter", "spring"]
    const test = [1, 2, 3, 4] */

    if(isAnchor(linkFile)) {
        if(!linkFile.href.includes("127.0.0.1")) {
            window.URL.revokeObjectURL(linkFile.href);
            linkFile.href = "";
        };
        const blob = new Blob([data], { type: filetype });
        const url = window.URL.createObjectURL(blob);

        linkFile.href = url;
        linkFile.download = filename;
    };
    
/*     if(button && file && fileLoader && filePlaceholder && realFile && linkFile) {

        async function downloadTest() {
            switchToLoader();
            for(let t of test) {
                for(let indexS in stest) {
                    message(String(t), stest[indexS]);
                    await delay(2000);
                };
                if(t === test[test.length - 1]) {
                    if(linkFile instanceof HTMLAnchorElement) {
                        if(linkFile.href) {
                            window.URL.revokeObjectURL(linkFile.href);
                        }
                        const blob = new Blob(["Texto simples"], { type: "text/plain" });
                        const url = window.URL.createObjectURL(blob);
        
                        linkFile.href = url;
                        linkFile.download = "texto.txt";
                    }
                    switchToFIle();
                }
            }
        }

        function startDownload(fileType: string, data: string, filename: string) {
            const linkElement = document.createElement("a");
            const blob = new Blob([data], { type: fileType });
            const url = window.URL.createObjectURL(blob);

            linkElement.href = url;
            linkElement.download = filename;

            linkElement.style.display = "none";
            file?.append(linkElement);

            linkElement.click();

            linkElement.remove();
            window.URL.revokeObjectURL(url);
        };

        
        //button.addEventListener("click", downloadTest);
    } */
};

export function loadMessage(ano: string, temporada: string) {
    const loadMessage = document.querySelector(".file-loader .message");

    if(isHTMLElement(loadMessage)) {
        loadMessage.children[0].textContent = ano;
        loadMessage.children[1].textContent = temporada;
    }
}

export function setFileName(newName: string) {
    const fileName = document.querySelector(".real-file .icon-name > p");

    if(isHTMLElement(fileName)) {
        fileName.textContent = newName;
    }
}