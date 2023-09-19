import domElements from "./constants.js";
import {
    dropdownToggle,
    removeFilterItem,
    emptyInputValue,
    toggleCrossInput,
    addFilterOptionSelected,
} from "./functions.js";

const listener = () => {
    domElements.dropdownDevices
        .querySelector("button")
        .addEventListener("click", () => {
            dropdownToggle(domElements.dropdownDevices);
        });

    domElements.dropdownUstensils
        .querySelector("button")
        .addEventListener("click", () => {
            dropdownToggle(domElements.dropdownUstensils);
        });

    domElements.dropdownIngredients
        .querySelector("button")
        .addEventListener("click", () => {
            dropdownToggle(domElements.dropdownIngredients);
        });

    for (let inputCross of domElements.inputCross) {
        inputCross.addEventListener("click", (e) => {
            emptyInputValue(e);
        });
    }

    for (let input of domElements.searchInputs) {
        input.addEventListener("input", (e) => {
            toggleCrossInput(e);
        });
    }

    for (let crossButton of domElements.filtersResultItemButton) {
        crossButton.addEventListener("click", (e) => {
            removeFilterItem(e);
        });
    }

    for (let option of domElements.filterOptions) {
        option.addEventListener("click", (e) => {
            addFilterOptionSelected(e);
        });
    }
};

export default listener;
