import initDateMaintenance from "./modules/dateMaintenance.js";
import initCheckboxBehavior from "./modules/checkboxBehavior.js";
import initRangeSlider from "./modules/rangeSliders.js";
import executeFetch from "./modules/executeFetch.js";
import initLocalStorage from "./modules/localStorage.js";
import toggleErrorModal from "./modules/modal.js";
import { getFaixaEtaria } from "./modules/handleForm.js";

initLocalStorage();
initDateMaintenance();
initCheckboxBehavior();
initRangeSlider();

document.querySelector("button")!.addEventListener('click', getFaixaEtaria);