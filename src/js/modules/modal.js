import { isHTMLElement } from "./typeguards.js";
export default function showErrorModal(message) {
    const botaoFechar = document.querySelector(".fechar");
    const containerModal = document.querySelector(".error-modal-container");
    const errorMessage = document.querySelector(".error-message");
    if (botaoFechar && containerModal) {
        function toggleModal() {
            if (isHTMLElement(containerModal) && isHTMLElement(botaoFechar)) {
                containerModal.classList.toggle('ativo');
                if (!containerModal.classList.contains('ativo')) {
                    botaoFechar.removeEventListener('click', toggleModal);
                }
                ;
            }
            ;
        }
        ;
        function outclickModal(event) {
            if (event.target === this && isHTMLElement(containerModal)) {
                toggleModal();
                containerModal.removeEventListener('click', outclickModal);
            }
            ;
        }
        ;
        function showErrorMessage() {
            if (isHTMLElement(errorMessage)) {
                errorMessage.textContent = message;
            }
            ;
            toggleModal();
        }
        ;
        botaoFechar.addEventListener('click', toggleModal);
        containerModal.addEventListener('click', outclickModal);
        showErrorMessage();
    }
    ;
}
;
//# sourceMappingURL=modal.js.map