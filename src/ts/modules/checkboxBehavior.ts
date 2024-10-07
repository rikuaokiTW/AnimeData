export default function initCheckboxBehavior() {
    const fieldCheckboxes = document.querySelectorAll('.fields [type="checkbox"]');
    const filterCheckboxes = document.querySelectorAll('.filters [type="checkbox"]');

    // TYPE GUARD PARA HTMLINPUT, AQUI ESPECIFICAMENTE CHECKBOXES
    function isCheckbox(value: unknown): value is HTMLInputElement {
        return value instanceof HTMLInputElement;
    };

    if(fieldCheckboxes && filterCheckboxes) {
        // MUDA A COR DE FUNDO DA DIV PAI DA CHECKBOX
        function checkedBgColor() {
            fieldCheckboxes.forEach(checkbox => {
                if(isCheckbox(checkbox)) {
                    if(checkbox.checked == true) {
                        checkbox.parentElement?.parentElement?.setAttribute("style", "background-color:#DDE3EF;");
                    } else {
                        checkbox.parentElement?.parentElement?.setAttribute("style", "background-color:none;");
                    };
                };
            });
            filterCheckboxes.forEach(checkbox => {
                if(isCheckbox(checkbox)) {
                    if(checkbox.checked == true) {
                        checkbox.parentElement?.setAttribute("style", "background-color:#DDE3EF;");
                    } else {
                        checkbox.parentElement?.setAttribute("style", "background-color:none;");
                    };
                };
            });
        };
        
        // DEFINE O COMPORTAMENTO DAS CHECKBOXES EM RELAÇÃO À OPÇÃO 'TODOS'
        function checkedAll(target: HTMLInputElement) {
            filterCheckboxes.forEach(checkbox => {
                if(isCheckbox(checkbox)) {
                    // CASO A OPÇÃO 'TODOS' SEJA MARCADA OU DESMARCADA, AS DEMAIS TAMBÉM DEVEM SER MARCADAS OU DESMARCADAS
                    if(checkbox.name === 'todos' && target.name === 'todos') {
                        const checkboxes = checkbox.parentElement?.parentElement?.children;
                        if(checkboxes && checkbox.checked == true) {
                            for(let i = 1; i < checkboxes?.length; ++i) {
                                let nextCheckbox = checkboxes[i].children[0];
                                if(isCheckbox(nextCheckbox)) {
                                    nextCheckbox.checked = true;
                                    checkedBgColor();
                                };
                            };
                        };
                        if(checkboxes && checkbox.checked == false) {
                            for(let i = 1; i < checkboxes?.length; ++i) {
                                let nextCheckbox = checkboxes[i].children[0];
                                if(isCheckbox(nextCheckbox)) {
                                    nextCheckbox.checked = false;
                                    checkedBgColor();
                                };
                            };
                        };
                    };
                    // FAZER A OPÇÃO 'TODOS' SER DESMARCADA CASO UMA DAS OUTRAS OPÇÕES SEJA DESMARCADA
                    if(checkbox.name != 'todos') {
                        const checkboxes = checkbox.parentElement?.parentElement?.children;
                        if(checkboxes && checkbox.checked == false) {
                            let allCheckbox = checkboxes[0].children[0];
                            if(isCheckbox(allCheckbox)) {
                                if(allCheckbox.checked == true) {
                                    allCheckbox.checked = false;
                                    checkedBgColor();
                                };
                            };
                        };
                    };
                    // FAZER A OPÇÃO 'TODOS' SER MARCADA CASO TODAS AS OUTRAS OPÇÕES ESTEJAM MARCADAS
                    if(checkbox.name != 'todos') {
                        const checkboxes = checkbox.parentElement?.parentElement?.children;
                        if(checkboxes && checkbox.checked == true) {
                            let allCheckbox = checkboxes[0].children[0];
                            let allChecked = [];
                            for(let i = 1; i < checkboxes.length; i++) {
                                let nextCheckbox = checkboxes[i].children[0];
                                if(isCheckbox(nextCheckbox)) {
                                    allChecked.push(nextCheckbox.checked);
                                };
                            };
                            if(allChecked.every(value => value === true)) {
                                if(isCheckbox(allCheckbox)) {
                                    if(allCheckbox.checked == false) {
                                        allCheckbox.checked = true;
                                        checkedBgColor();
                                    };
                                };
                            };
                        };
                    };
                };
            });
        };
        
        // RESPONSÁVEL POR EVOCAR AS FUNÇÕES DO COMPORTAMENTO DAS CHECKBOXES
        function handleCheckboxBehavior(event: Event) {
            checkedBgColor();
            checkedAll(event.target as HTMLInputElement);
        };
        
        [fieldCheckboxes, filterCheckboxes].forEach(checkboxList => 
            checkboxList.forEach(checkbox => {
                if(isCheckbox(checkbox)) {
                    checkbox.addEventListener('click', handleCheckboxBehavior);
                }
        }));
    }
}


