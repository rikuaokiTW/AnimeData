export default function initDownloadableFile() {
    const button = document.querySelector("button");
    const file = document.querySelector(".file");
    if (button && file) {
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
        button.addEventListener("click", startDownload);
    }
}
//# sourceMappingURL=downloadableFile.js.map