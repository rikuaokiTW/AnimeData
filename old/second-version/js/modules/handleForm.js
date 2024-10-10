export default function initHandleForm() {
    const button = document.querySelector("button");
    const file = document.querySelector(".file");
    const fileLoader = document.querySelector(".file-loader");
    const loadMessage = document.querySelector(".file-loader .message");
    const filePlaceholder = document.querySelector(".file-placeholder");
    const realFile = document.querySelector(".real-file");
    const linkFile = document.querySelector(".real-file a");
    const delay = (ms) => new Promise(res => setTimeout(res, ms));
    const stest = ["winter", "spring"];
    const test = [1, 2, 3, 4];
    function isHTMLElement(value) {
        return value instanceof HTMLElement;
    }
    if (button && file && fileLoader && loadMessage && filePlaceholder && realFile && linkFile) {
        async function downloadTest() {
            console.log("sim");
            switchToLoader();
            for (let t of test) {
                for (let indexS in stest) {
                    message(String(t), stest[indexS]);
                    await delay(2000);
                }
                ;
                if (t === test[test.length - 1]) {
                    if (linkFile instanceof HTMLAnchorElement) {
                        const blob = new Blob(["Texto simples"], { type: "text/plain" });
                        const url = window.URL.createObjectURL(blob);
                        linkFile.href = url;
                        linkFile.download = "texto.txt";
                    }
                    switchToFIle();
                }
            }
        }
        function startDownload() {
            const linkElement = document.createElement("a");
            const blob = new Blob(["Texto simples"], { type: "text/plain" });
            const url = window.URL.createObjectURL(blob);
            linkElement.href = url;
            linkElement.download = "texto.txt";
            linkElement.style.display = "none";
            file?.append(linkElement);
            linkElement.click();
            linkElement.remove();
            window.URL.revokeObjectURL(url);
        }
        ;
        function message(ano, temporada) {
            if (loadMessage instanceof HTMLElement) {
                loadMessage.children[0].textContent = ano;
                loadMessage.children[1].textContent = temporada;
            }
        }
        function switchDisplay(element, display = "block") {
            const ativo = window.getComputedStyle(element, null).display;
            if (ativo != "none") {
                element.style.display = "none";
            }
            else {
                element.style.display = display;
            }
        }
        function switchToLoader() {
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
        function switchToFIle() {
            if (isHTMLElement(filePlaceholder) &&
                isHTMLElement(fileLoader) &&
                isHTMLElement(realFile)) {
                if (fileLoader.style.display != "none") {
                    switchDisplay(fileLoader);
                    switchDisplay(realFile);
                }
                ;
            }
            ;
        }
        ;
        button.addEventListener("click", downloadTest);
    }
}
//# sourceMappingURL=handleForm.js.map