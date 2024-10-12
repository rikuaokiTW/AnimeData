import { isCheckbox } from "./typeguards.js";

export function getFields() {
    const formFields = document.querySelectorAll(".fields [type='checkbox']");

    if(formFields) {
        const fields: checkbox[] = [];
        formFields.forEach(checkbox => {
            if(isCheckbox(checkbox)) {
                let obj: checkbox = {};
                obj[checkbox.id] = checkbox.checked
                fields.push(obj);
            };
        });

        return fields;
    } else {
        return [];
    };
};