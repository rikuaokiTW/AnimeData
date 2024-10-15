import { isCheckbox } from "./typeguards.js";
export default function initLocalStorage() {
    const filterCheckboxes = document.querySelectorAll('.filters [type="checkbox"]');
    window.formData = {};
    if (true && filterCheckboxes) {
        function validJSON(str) {
            try {
                JSON.parse(str);
            }
            catch {
                return false;
            }
            return true;
        }
        ;
        function loadLocalStorage() {
            const localFormData = localStorage.getItem('formData');
            if (localFormData && validJSON(localFormData)) {
                const formData = JSON.parse(localFormData);
                Object.entries(formData).forEach(([key, value]) => {
                    const input = document.getElementById(key);
                    if (input instanceof HTMLInputElement && typeof value == 'boolean') {
                        input.checked = value;
                        window.formData[key] = value;
                    }
                    ;
                    if (input instanceof HTMLInputElement && typeof value == 'string') {
                        input.value = value;
                        window.formData[key] = value;
                    }
                });
            }
            ;
        }
        ;
        function handleInput({ target }) {
            if (target instanceof HTMLInputElement && target.type == 'checkbox') {
                let checkbox = target.parentElement?.parentElement?.children[0].children[0];
                if (checkbox && isCheckbox(checkbox)) {
                    if (checkbox.id.includes('todos')) {
                        if (window.formData[checkbox.id] != checkbox.checked) {
                            window.formData[checkbox.id] = checkbox.checked;
                            localStorage.setItem('formData', JSON.stringify(window.formData));
                        }
                        ;
                    }
                    ;
                }
                ;
                window.formData[target.id] = target.checked;
                localStorage.setItem('formData', JSON.stringify(window.formData));
            }
            ;
            if (target instanceof HTMLInputElement && (target.type == 'number' || target.type == "range")) {
                if (target.id.includes("to")) {
                    window.formData['toInput'] = target.value;
                    window.formData['toSlider'] = target.value;
                }
                if (target.id.includes("from")) {
                    window.formData['fromInput'] = target.value;
                    window.formData['fromSlider'] = target.value;
                }
                localStorage.setItem('formData', JSON.stringify(window.formData));
            }
            ;
            console.log();
        }
        ;
        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('change', handleInput);
        });
        loadLocalStorage();
    }
    ;
}
;
//# sourceMappingURL=localStorage.js.map