import showErrorModal from "./modal.js";
import { isCheckbox, isInput } from "./typeguards.js";
export function getCampos() {
    const formFields = document.querySelectorAll(".fields [type='checkbox']");
    try {
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
            if (fields.every(field => Object.values(field)[0] === false)) {
                throw new Error("É necessário que pelo menos um dos campos esteja marcado.");
            }
            return fields;
        }
        else {
            throw new Error("Não foi possível selecionar as checkboxes.");
        }
        ;
    }
    catch (err) {
        if (err instanceof Error) {
            showErrorModal(err.message);
        }
        ;
        return [];
    }
    ;
}
;
export function getAnos() {
    const fromInput = document.querySelector("#fromInput");
    const toInput = document.querySelector("#toInput");
    try {
        let anos = [];
        if (fromInput && toInput) {
            if (isInput(fromInput) && isInput(toInput)) {
                const initialYear = Number(fromInput.value);
                const lastYear = Number(toInput.value);
                anos = Array.from({ length: (lastYear + 1) - initialYear }, (value, index) => initialYear + index);
            }
            ;
        }
        ;
        if (anos.length) {
            return anos;
        }
        else {
            throw new Error("Não foi possível coletar os anos.");
        }
    }
    catch (err) {
        if (err instanceof Error) {
            showErrorModal(err.message);
        }
        ;
        return [];
    }
    ;
}
;
export function getTemporadas() {
    const filterCheckboxes = document.querySelectorAll(".filters [type='checkbox']");
    try {
        let temporadas = {
            todos: false,
            winter: false,
            spring: false,
            summer: false,
            fall: false,
        };
        filterCheckboxes.forEach(checkbox => {
            if (checkbox.id === 'todosTempID') {
                const checkboxes = checkbox.parentElement?.parentElement?.children;
                if (checkboxes) {
                    for (let i = 0; i < checkboxes?.length; ++i) {
                        let nextCheckbox = checkboxes[i].children[0];
                        if (isCheckbox(nextCheckbox)) {
                            switch (nextCheckbox.name) {
                                case 'todos':
                                    temporadas.todos = nextCheckbox.checked;
                                    break;
                                case 'inverno':
                                    temporadas.winter = nextCheckbox.checked;
                                    break;
                                case 'primavera':
                                    temporadas.spring = nextCheckbox.checked;
                                    break;
                                case 'verao':
                                    temporadas.summer = nextCheckbox.checked;
                                    break;
                                case 'outono':
                                    temporadas.fall = nextCheckbox.checked;
                                    break;
                                default:
                                    break;
                            }
                        }
                        ;
                    }
                    ;
                }
            }
            ;
        });
        if (Object.values(temporadas).some(value => value === true)) {
            return temporadas;
        }
        else {
            throw new Error("Pelo menos um dos campos de TEMPORADA deve estar marcado.");
        }
        ;
    }
    catch (err) {
        if (err instanceof Error) {
            showErrorModal(err.message);
        }
        ;
        return [];
    }
    ;
}
;
export function getTipos() {
    const filterCheckboxes = document.querySelectorAll(".filters [type='checkbox']");
    try {
        let tipos = {
            todos: false,
            tv: false,
            movie: false,
            ova: false,
            ona: false,
            music: false,
        };
        filterCheckboxes.forEach(checkbox => {
            if (checkbox.id === 'todosTipoID') {
                const checkboxes = checkbox.parentElement?.parentElement?.children;
                if (checkboxes) {
                    for (let i = 0; i < checkboxes?.length; ++i) {
                        let nextCheckbox = checkboxes[i].children[0];
                        if (isCheckbox(nextCheckbox)) {
                            switch (nextCheckbox.name) {
                                case 'todos':
                                    tipos.todos = nextCheckbox.checked;
                                    break;
                                case 'tv':
                                    tipos.tv = nextCheckbox.checked;
                                    break;
                                case 'movie':
                                    tipos.movie = nextCheckbox.checked;
                                    break;
                                case 'ova':
                                    tipos.ova = nextCheckbox.checked;
                                    break;
                                case 'ona':
                                    tipos.ona = nextCheckbox.checked;
                                    break;
                                case 'music':
                                    tipos.music = nextCheckbox.checked;
                                    break;
                                default:
                                    break;
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
        if (Object.values(tipos).some(value => value === true)) {
            return tipos;
        }
        else {
            throw new Error("Pelo menos um dos campos de TIPO deve estar marcado.");
        }
        ;
    }
    catch (err) {
        if (err instanceof Error) {
            showErrorModal(err.message);
        }
        ;
        return [];
    }
    ;
}
export function getStatus() {
    const filterCheckboxes = document.querySelectorAll(".filters [type='checkbox']");
    try {
        let status = {
            todos: false,
            "Finished Airing": false,
            "Currently Airing": false,
            "Not yet aired": false,
        };
        filterCheckboxes.forEach(checkbox => {
            if (checkbox.id === 'todosStatusID') {
                const checkboxes = checkbox.parentElement?.parentElement?.children;
                if (checkboxes) {
                    for (let i = 0; i < checkboxes?.length; ++i) {
                        let nextCheckbox = checkboxes[i].children[0];
                        if (isCheckbox(nextCheckbox)) {
                            switch (nextCheckbox.name) {
                                case 'todos':
                                    status.todos = nextCheckbox.checked;
                                    break;
                                case 'finalizado':
                                    status["Finished Airing"] = nextCheckbox.checked;
                                    break;
                                case 'exibicao':
                                    status["Currently Airing"] = nextCheckbox.checked;
                                    break;
                                case 'exibido':
                                    status["Not yet aired"] = nextCheckbox.checked;
                                    break;
                                default:
                                    break;
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
        if (Object.values(status).some(value => value === true)) {
            return status;
        }
        else {
            throw new Error("Pelo menos um dos campos de STATUS deve estar marcado.");
        }
        ;
    }
    catch (err) {
        if (err instanceof Error) {
            showErrorModal(err.message);
        }
        ;
        return [];
    }
    ;
}
;
export function getFaixaEtaria() {
    const filterCheckboxes = document.querySelectorAll(".filters [type='checkbox']");
    try {
        let etaria = {
            todos: false,
            "G - All Ages": false,
            "PG - Children": false,
            "PG-13 - Teens 13 or older": false,
            "R - 17+ (violence & profanity)": false,
            "R+ - Mild Nudity": false,
            "Rx - Hentai": false,
        };
        filterCheckboxes.forEach(checkbox => {
            if (checkbox.id === 'todosEtariaID') {
                const checkboxes = checkbox.parentElement?.parentElement?.children;
                if (checkboxes) {
                    for (let i = 0; i < checkboxes?.length; ++i) {
                        let nextCheckbox = checkboxes[i].children[0];
                        if (isCheckbox(nextCheckbox)) {
                            switch (nextCheckbox.name) {
                                case 'todos':
                                    etaria.todos = nextCheckbox.checked;
                                    break;
                                case 'g':
                                    etaria["G - All Ages"] = nextCheckbox.checked;
                                    break;
                                case 'pg':
                                    etaria["PG - Children"] = nextCheckbox.checked;
                                    break;
                                case 'pg-13':
                                    etaria["PG-13 - Teens 13 or older"] = nextCheckbox.checked;
                                    break;
                                case 'r-17':
                                    etaria["R - 17+ (violence & profanity)"] = nextCheckbox.checked;
                                    break;
                                case 'r':
                                    etaria["R+ - Mild Nudity"] = nextCheckbox.checked;
                                    break;
                                case 'rx':
                                    etaria["Rx - Hentai"] = nextCheckbox.checked;
                                    break;
                                default:
                                    break;
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
        if (Object.values(etaria).some(value => value === true)) {
            return etaria;
        }
        else {
            throw new Error("Pelo menos um dos campos de FAIXA-ETÁRIA deve estar marcado.");
        }
        ;
    }
    catch (err) {
        if (err instanceof Error) {
            showErrorModal(err.message);
        }
        ;
        return [];
    }
    ;
}
;
//# sourceMappingURL=handleForm.js.map