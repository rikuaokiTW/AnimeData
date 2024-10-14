import { isHTMLElement } from "./typeguards.js";

export default function showErrorModal(message: string) {
    const botaoFechar = document.querySelector(".fechar");
    const containerModal = document.querySelector(".error-modal-container");
    const errorMessage = document.querySelector(".error-message");
    console.log('sim 1 error modal')

    if (botaoFechar && containerModal) {
        console.log('sim 2 error modal');
        function toggleModal() {
            if(isHTMLElement(containerModal) && isHTMLElement(botaoFechar)) {
                console.log('sim 4 error modal')
                containerModal.classList.toggle('ativo');
                if(!containerModal.classList.contains('ativo')) {
                    botaoFechar.removeEventListener('click', toggleModal);
                };
            };
        };

        function outclickModal(this: HTMLElement, event: Event) {
            if (event.target === this && isHTMLElement(containerModal)) {
                toggleModal();
                containerModal.removeEventListener('click', outclickModal);
            };
        };

        function showErrorMessage() {
            console.log('sim 3 error modal')
            if(isHTMLElement(errorMessage)) {
                errorMessage.textContent = message;
            };
            toggleModal();
        };

        if(!containerModal.classList.contains('ativo')) {
            botaoFechar.addEventListener('click', toggleModal);
            containerModal.addEventListener('click', outclickModal);
            showErrorMessage();
        };
    };
};

