import { isCheckbox } from "./typeguards.js";
export function getFields() {
    const formFields = document.querySelectorAll(".fields [type='checkbox']");
    if (formFields) {
        const fields = [];
        formFields.forEach(checkbox => {
            if (isCheckbox(checkbox)) {
                let obj = {};
                obj[checkbox.id] = checkbox.checked;
                fields.push(obj);
            }
            ;
        });
        return fields;
    }
    else {
        return [];
    }
    ;
}
;
//# sourceMappingURL=handleForm.js.map