export default function initCheckboxBehavior() {
    const fieldCheckboxes = document.querySelectorAll('.fields [type="checkbox"]');
    const filterCheckboxes = document.querySelectorAll('.filters [type="checkbox"]');
    function isCheckbox(value) {
        return value instanceof HTMLInputElement;
    }
    ;
    if (fieldCheckboxes && filterCheckboxes) {
        function checkedBgColor() {
            fieldCheckboxes.forEach(checkbox => {
                if (isCheckbox(checkbox)) {
                    if (checkbox.checked == true) {
                        checkbox.parentElement?.parentElement?.setAttribute("style", "background-color:#DDE3EF;");
                    }
                    else {
                        checkbox.parentElement?.parentElement?.setAttribute("style", "background-color:none;");
                    }
                    ;
                }
                ;
            });
            filterCheckboxes.forEach(checkbox => {
                if (isCheckbox(checkbox)) {
                    if (checkbox.checked == true) {
                        checkbox.parentElement?.setAttribute("style", "background-color:#DDE3EF;");
                    }
                    else {
                        checkbox.parentElement?.setAttribute("style", "background-color:none;");
                    }
                    ;
                }
                ;
            });
        }
        ;
        function checkedAll(target) {
            filterCheckboxes.forEach(checkbox => {
                if (isCheckbox(checkbox)) {
                    if (checkbox.name === 'todos' && target.name === 'todos') {
                        const checkboxes = checkbox.parentElement?.parentElement?.children;
                        if (checkboxes && checkbox.checked == true) {
                            for (let i = 1; i < checkboxes?.length; ++i) {
                                let nextCheckbox = checkboxes[i].children[0];
                                if (isCheckbox(nextCheckbox)) {
                                    nextCheckbox.checked = true;
                                    checkedBgColor();
                                }
                                ;
                            }
                            ;
                        }
                        ;
                        if (checkboxes && checkbox.checked == false) {
                            for (let i = 1; i < checkboxes?.length; ++i) {
                                let nextCheckbox = checkboxes[i].children[0];
                                if (isCheckbox(nextCheckbox)) {
                                    nextCheckbox.checked = false;
                                    checkedBgColor();
                                }
                                ;
                            }
                            ;
                        }
                        ;
                    }
                    ;
                    if (checkbox.name != 'todos') {
                        const checkboxes = checkbox.parentElement?.parentElement?.children;
                        if (checkboxes && checkbox.checked == false) {
                            let allCheckbox = checkboxes[0].children[0];
                            if (isCheckbox(allCheckbox)) {
                                if (allCheckbox.checked == true) {
                                    allCheckbox.checked = false;
                                    checkedBgColor();
                                }
                                ;
                            }
                            ;
                        }
                        ;
                    }
                    ;
                    if (checkbox.name != 'todos') {
                        const checkboxes = checkbox.parentElement?.parentElement?.children;
                        if (checkboxes && checkbox.checked == true) {
                            let allCheckbox = checkboxes[0].children[0];
                            let allChecked = [];
                            for (let i = 1; i < checkboxes.length; i++) {
                                let nextCheckbox = checkboxes[i].children[0];
                                if (isCheckbox(nextCheckbox)) {
                                    allChecked.push(nextCheckbox.checked);
                                }
                                ;
                            }
                            ;
                            if (allChecked.every(value => value === true)) {
                                if (isCheckbox(allCheckbox)) {
                                    if (allCheckbox.checked == false) {
                                        allCheckbox.checked = true;
                                        checkedBgColor();
                                    }
                                    ;
                                }
                                ;
                            }
                            ;
                        }
                        ;
                    }
                    ;
                }
                ;
            });
        }
        ;
        function handleCheckboxBehavior(event) {
            checkedBgColor();
            checkedAll(event.target);
        }
        ;
        [fieldCheckboxes, filterCheckboxes].forEach(checkboxList => checkboxList.forEach(checkbox => {
            if (isCheckbox(checkbox)) {
                checkbox.addEventListener('click', handleCheckboxBehavior);
            }
        }));
    }
}
//# sourceMappingURL=checkboxBehavior.js.map