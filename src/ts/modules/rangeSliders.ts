export default function initRangeSlider() {
    const sliderOne = document.querySelector("#fromSlider");
    const sliderTwo = document.querySelector("#toSlider");
    const inputOne = document.querySelector("#fromInput");
    const inputTwo = document.querySelector("#toInput");
    const sliderTrack = document.querySelector(".slider-track");
    const minGap = 0;
    const maxInput = new Date().getFullYear();
    
    function isInput(value: unknown): value is HTMLInputElement {
        return value instanceof HTMLInputElement;
    };

    if(sliderOne && sliderTwo && inputOne && inputTwo && sliderTrack) {
        // RETORNA UMA LISTA COM OS ANOS POSSÍVEIS DENTRO DO INTERVALO ESTABELECIDO
        function getYears() {
            let yearsList: number[] = [];

            if(isInput(inputOne)) {
                const initialYear = Number(inputOne.min);
                const currentYear = new Date().getFullYear();
                
                yearsList = Array.from(
                    {length: (currentYear + 1) - initialYear},
                    (value, index) => initialYear + index
                );
            };

            return yearsList;
        };

        // FORÇA OS VALORES DE MINMAX DO INPUT, IMPEDINDO NÚMEROS FORA DO INTERVALO
        function enforceMinMax() {
            if(isInput(inputOne) && isInput(inputTwo)) {
                if(Number(inputOne.value) < Number(inputOne.min)) {
                    inputOne.value = inputOne.min;
                };
                if(Number(inputOne.value) > maxInput) {
                    inputOne.value = String(maxInput);
                };
                if(Number(inputTwo.value) < Number(inputTwo.min)) {
                    inputTwo.value = inputTwo.min;
                };
                if(Number(inputTwo.value) > maxInput) {
                    inputTwo.value = String(maxInput);
                };
            };
        };

        // ATUALIZA O VALOR DOS SLIDERS CASO O VALOR TENHA SIDO ALTERADO POR MEIO DE INPUT
        function updateSliders() {
            if(
                isInput(sliderOne) &&
                isInput(sliderTwo) &&
                isInput(inputOne) &&
                isInput(inputTwo)
            ) {
                if(
                    inputOne.value != sliderOne.value ||
                    inputTwo.value != sliderTwo.value
                ) {
                    sliderOne.value = inputOne.value;
                    sliderTwo.value = inputTwo.value;
                };
            };
            fillColor();
        };

        // CONTROLA O COMPORTAMENTO DO SLIDER 1, IMPEDINDO QUE ELE ULTRAPASSE O SLIDER 2 E ATUALIZA SEU RESPECTIVO INPUT
        function slideOne() {
            if(
                isInput(sliderOne) &&
                isInput(sliderTwo) &&
                isInput(inputOne)
            ) {
                if(parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
                    sliderOne.value = String(parseInt(sliderTwo.value) - minGap);
                };

                inputOne.value = sliderOne.value;
            };
            fillColor();
        };
        
        // CONTROLA O COMPORTAMENTO DO SLIDER 2, IMPEDINDO QUE ELE ULTRAPASSE O SLIDER 1 E ATUALIZA SEU RESPECTIVO INPUT
        function slideTwo() {
            if(
                isInput(sliderOne) &&
                isInput(sliderTwo) &&
                isInput(inputTwo)
            ) {
                if(parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
                    sliderTwo.value = String(parseInt(sliderOne.value) + minGap);
                };
                inputTwo.value = sliderTwo.value;
            };
            fillColor();
        };
        
        // CUIDA DO PREENCHIMENTO DE CORES NO INTERVALO DOS SLIDERS
        function fillColor() {
            if(
                isInput(sliderOne) &&
                isInput(sliderTwo)
            ) {
                const yearsList = getYears();
                let percent1 = (yearsList.indexOf(Number(sliderOne.value)) / yearsList.length) * 100;
                let percent2 = (yearsList.indexOf(Number(sliderTwo.value)) / yearsList.length) * 100;
                
                if(sliderTrack instanceof HTMLElement) {
                    sliderTrack.style.cssText = `
                        background: -moz-linear-gradient(left, #DDDDDD 0%, #DDDDDD ${percent1}%, #2E51A2 ${percent1}%, #2E51A2 ${percent2}%, #DDDDDD ${percent2}%, #DDDDDD 100%);
                        background: -webkit-gradient(left top, right top, color-stop(0%, #DDDDDD), color-stop(${percent1}%, #DDDDDD), color-stop(${percent1}%, #2E51A2), color-stop(${percent2}%, #2E51A2), color-stop(${percent2}%, #DDDDDD), color-stop(100%, #DDDDDD));
                        background: -webkit-linear-gradient(left, #DDDDDD ${percent1}%, #2E51A2 ${percent1}%, #2E51A2 ${percent2}%, #DDDDDD ${percent2}%);
                        background: -o-linear-gradient(left, #DDDDDD 0%, #DDDDDD ${percent1}%, #2E51A2 ${percent1}%, #2E51A2 ${percent2}%, #DDDDDD ${percent2}%, #DDDDDD 100%);
                        background: -ms-linear-gradient(left, #DDDDDD 0%, #DDDDDD ${percent1}%, #2E51A2 ${percent1}%, #2E51A2 ${percent2}%, #DDDDDD ${percent2}%, #DDDDDD 100%);
                        background: linear-gradient(to right, #DDDDDD ${percent1}%, #2E51A2 ${percent1}%, #2E51A2 ${percent2}%, #DDDDDD ${percent2}%);
                    `;
                };
            };
        };

        // ATUALIZA AS CORES E O FUNCIONAMENTO DE ACORDO COM OS VALORES INICIAIS NO HTML
        function startValues() {
            slideOne();
            slideTwo();
        };
        
        startValues();
        sliderOne.addEventListener('input', slideOne);
        sliderTwo.addEventListener('input', slideTwo);
        [inputOne, inputTwo].forEach(input => {
            input.addEventListener('input', updateSliders);
            //input.addEventListener('input', enforceMinMax);
            input.addEventListener('focusout', enforceMinMax);
        });
    };
};