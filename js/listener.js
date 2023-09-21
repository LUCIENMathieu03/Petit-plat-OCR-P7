import domElements from "./constants.js";
import {
    dropdownToggle,
    removeFilterItem,
    emptyInputValue,
    toggleCrossInput,
    addFilterOptionSelected,
} from "./functions.js";

const listener = () => {
    // Display the dropdown menu
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

    // empty the input text
    for (let inputCross of domElements.inputCross) {
        inputCross.addEventListener("click", (e) => {
            emptyInputValue(e);
        });
    }

    //Display the cross to empty the input
    for (let input of domElements.searchInputs) {
        input.addEventListener("input", (e) => {
            toggleCrossInput(e);
        });
    }

    deleteTagEvent();
};

//Delete a tag
function deleteTagEvent() {
    domElements.tagButton = document.querySelectorAll(
        ".filtersResult_item button"
    );

    for (let crossButton of domElements.tagButton) {
        crossButton.addEventListener("click", (e) => {
            removeFilterItem(e);
        });
    }
}

//Create a tag
function createTagEvent() {
    domElements.filterOptions = document.querySelectorAll(".optionsChoice li");

    for (let option of domElements.filterOptions) {
        option.addEventListener("click", (e) => {
            addFilterOptionSelected(e);
        });
    }
}

export { listener, deleteTagEvent, createTagEvent };
