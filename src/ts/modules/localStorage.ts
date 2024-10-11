export default function initLocalStorage() {
    window.formData = {};

    if(true) {
        /* function isKeyofCampos<Chave extends keyof formData>(
            value: Chave
        ): formData[Chave] | null {
            return true;
        };

        function checkInterface<Interface>(
            obj: unknown,
            key: keyof Interface
        ): obj is Interface  {
            if(
                obj &&
                typeof obj === 'object' &&
                key in obj
            ) {
                return true;
            } else {
                return false;
            };
        }; */

        function validJSON(str: string) {
            try {
                JSON.parse(str);
            } catch {
                return false;
            }
            return true;
        };

        function loadLocalStorage() {
            const localFormData = localStorage.getItem('formData');
            if(localFormData && validJSON(localFormData)) {
                const formData = JSON.parse(localFormData);
                Object.entries(formData).forEach(([key, value]) => {
                    const input = document.getElementById(key);
                    if(input instanceof HTMLInputElement && typeof value == 'boolean') {
                        input.checked = value;
                        window.formData[key] = value;
                    };
                    if(input instanceof HTMLInputElement && typeof value == 'string') {
                        input.value = value;
                        window.formData[key] = value;
                    }
                });
            };
        };

        function handleInput({ target }: Event) {
            if (target instanceof HTMLInputElement && target.type == 'checkbox') {
                window.formData[target.id] = target.checked;
                localStorage.setItem('formData', JSON.stringify(window.formData));
            };
            if (target instanceof HTMLInputElement && (target.type == 'number' || target.type == "range")) {
                if(target.id.includes("to")) {
                    window.formData['toInput'] = target.value;
                    window.formData['toSlider'] = target.value;
                }
                if(target.id.includes("from")) {
                    window.formData['fromInput'] = target.value;
                    window.formData['fromSlider'] = target.value;
                }
                localStorage.setItem('formData', JSON.stringify(window.formData));
            };
            console.log();
        };


        document.querySelectorAll<HTMLElement>('form').forEach(form => {
            form.addEventListener('change', handleInput);
        });
        loadLocalStorage();
    };
};