import domElements from "./constants.js";
import {
    dropdownToggle,
    removeFilterItem,
    emptyInputValue,
    toggleCrossInput,
    addFilterOptionSelected,
    searchRecipe,
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

    //Display result when the input is filled
    domElements.mainInput.addEventListener("input", (e) => {
        searchRecipe(e.target.value);
    });

    //adding event to the listener function
    deleteTagEvent();

    //adding fliter tag event
    filterTagOptions(domElements.inputFilterIngredient);
    filterTagOptions(domElements.inputFilterAppareil);
    filterTagOptions(domElements.inputFilterUstensil);
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

//Filter the tag options
function filterTagOptions(input) {
    input.addEventListener("input", (e) => {
        let optionListContainer = e.target
            .closest(".options")
            .querySelector(".optionsChoice");
        let listOptions = optionListContainer.querySelectorAll("li");

        for (let option of listOptions) {
            if (
                !option.innerHTML
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase())
            ) {
                option.classList.add("hidden");
            } else {
                if (option.classList.contains("hidden")) {
                    option.classList.remove("hidden");
                }
            }
        }
    });
}

export { listener, deleteTagEvent, createTagEvent };
