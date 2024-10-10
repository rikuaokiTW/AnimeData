export default function initDateMaintenance() {
    const inputOne = document.querySelector("#fromInput");
    const inputTwo = document.querySelector("#toInput");
    if (inputOne && inputTwo) {
        function isInput(value) {
            return value instanceof HTMLInputElement;
        }
        ;
        function adjustYears() {
            if (isInput(inputOne) && isInput(inputTwo)) {
                const currentYear = inputTwo.value;
                const realLastYear = new Date().getFullYear();
                if (Number(currentYear) != realLastYear) {
                    inputOne.max = String(currentYear);
                    inputTwo.max = String(currentYear);
                    inputTwo.value = String(currentYear);
                }
                ;
            }
            ;
        }
        ;
        adjustYears();
    }
    ;
}
;
//# sourceMappingURL=dateMaintenance.js.map