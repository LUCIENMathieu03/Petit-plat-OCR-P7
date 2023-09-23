import domElements from "./constants.js";
import recipesCard from "./templates/recipeCard.js";
import filterOption from "./templates/filterOption.js";
import RecipeModel from "./models/RecipeModel.js";
import FilterModel from "./models/FilterModel.js";
import { createTagEvent } from "./listener.js";

//
//Display all the recipes
//
function displayRecipes(data) {
    domElements.recipesResult.innerHTML = "";
    data.map((recipe) => new RecipeModel(recipe)).forEach((recipe) => {
        const recipeToDisplay = new recipesCard(recipe);
        const recipeDom = recipeToDisplay.getRecipeCard();
        domElements.recipesResult.appendChild(recipeDom);
    });
}

//
//Add all the option in the good dropdown menu
//
function displayFilterOptions(data) {
    //Store the all the options
    let ingredients = [];
    let appliances = [];
    let ustensils = [];

    //Empty all the options before adding filtered options
    domElements.dropdownIngredients.querySelector(".optionsChoice").innerHTML =
        " ";
    domElements.dropdownDevices.querySelector(".optionsChoice").innerHTML = " ";
    domElements.dropdownUstensils.querySelector(".optionsChoice").innerHTML =
        " ";

    //Get all the options from data
    data.map((recipe) => new FilterModel(recipe)).forEach((recipeFilter) => {
        getAllOptions(recipeFilter);
    });

    //Adding the option in the DOM
    ingredients.sort().map((ingredient) => {
        const optionToDisplay = new filterOption();
        const ingredientOptionDom = optionToDisplay.getOption(ingredient);
        domElements.dropdownIngredients
            .querySelector(".optionsChoice")
            .appendChild(ingredientOptionDom);
    });
    appliances.sort().map((appliance) => {
        const optionToDisplay = new filterOption();
        const applianceOptionDom = optionToDisplay.getOption(appliance);
        domElements.dropdownDevices
            .querySelector(".optionsChoice")
            .appendChild(applianceOptionDom);
    });
    ustensils.sort().map((ustensil) => {
        const optionToDisplay = new filterOption();
        const ustensilsOptionDom = optionToDisplay.getOption(ustensil);
        domElements.dropdownUstensils
            .querySelector(".optionsChoice")
            .appendChild(ustensilsOptionDom);
    });

    createTagEvent();

    function getAllOptions(recipeFilter) {
        for (let ingredient of recipeFilter.ingredients) {
            if (!ingredients.includes(ingredient.ingredient.toLowerCase())) {
                ingredients.push(ingredient.ingredient.toLowerCase());
            }
        }

        if (!appliances.includes(recipeFilter.appliance.toLowerCase())) {
            appliances.push(recipeFilter.appliance.toLowerCase());
        }

        for (let ustensil of recipeFilter.ustensils) {
            if (!ustensils.includes(ustensil.toLowerCase())) {
                ustensils.push(ustensil.toLowerCase());
            }
        }
    }
}

//
//for listener: empty the input on click
//
const emptyInputValue = (e) => {
    const input = e.target.parentNode.previousElementSibling;
    if (input.value) {
        input.value = "";
    }
    e.target.parentNode.classList.add("hidden");
};

//
//for listener: remove a selected filter item
//
const removeFilterItem = (event) => {
    const filter = event.target.closest(".filtersResult_item");
    const parentElem = filter.parentNode;

    parentElem.removeChild(filter);
    domElements.tagButton = document.querySelectorAll(
        ".filtersResult_item button"
    );
};

//
//for listener: display the cross icon when input have text in it
//
const toggleCrossInput = (e) => {
    const xCross = e.target.parentNode.querySelector(".xCross");

    if (e.target.value.length != 0) {
        xCross.classList.remove("hidden");
    } else {
        xCross.classList.add("hidden");
    }
};

//
//for listener: show the drowpdown's filter options
//
const dropdownToggle = (dropdownMenuDom) => {
    const options = dropdownMenuDom.querySelector(".options");
    options.classList.toggle("hidden");

    //animation
    // if (options.classList.contains("hidden")) {
    //     if (options.classList.contains("animate-dropdownClose")) {
    //         options.classList.remove("animate-dropdownClose");
    //     }
    //     options.classList.add("animate-dropdownOpen");
    //     options.classList.remove("hidden");
    // } else {
    //     options.classList.replace(
    //         "animate-dropdownOpen",
    //         "animate-dropdownClose"
    //     );
    //     setTimeout(() => {
    //         options.classList.add("hidden");
    //     }, "500");
    // }
};

//
//for listener: add tag
//
const addFilterOptionSelected = (e) => {
    const selectedOptionToDisplay = new filterOption();
    const selectedOptionDom = selectedOptionToDisplay.getSelectedOption(
        e.target.innerText
    );
    //recalculate the existing tag button
    domElements.tagButton = document.querySelectorAll(
        ".filtersResult_item button"
    );

    //Check if the tag has already been added
    let canBeAdd = true;
    for (let crossButton of domElements.tagButton) {
        const pText = crossButton.previousElementSibling.innerText;

        if (pText == e.target.innerText) {
            canBeAdd = false;
        }
    }
    if (canBeAdd) {
        domElements.tagContainer.appendChild(selectedOptionDom);
    }

    //Adding deleteTag event only on new tag button
    selectedOptionDom
        .querySelector("button")
        .addEventListener("click", (e) => removeFilterItem(e));
    /////deleteTagEvent();
};

//Search engine
const searchRecipe = (inputValue) => {
    if (inputValue.length >= 3) {
        console.log(allRecipes);
        console.time("label");
        //empty the array to not have repetition
        recipeFiltered = [];

        for (let i = 0; i <= allRecipes.length - 1; i++) {
            let titre = allRecipes[i].name.toLowerCase();
            let description = allRecipes[i].description.toLowerCase();
            let ingredientArray = [];
            for (let ingredient of allRecipes[i].ingredients) {
                ingredientArray.push(ingredient.ingredient);
            }

            //check if any recipe match with the input
            if (
                titre.includes(inputValue.toLowerCase()) ||
                description.includes(inputValue.toLowerCase()) ||
                ingredientArray.join(" ").includes(inputValue.toLowerCase())
            ) {
                recipeFiltered.push(allRecipes[i]);
            }
        }

        displayRecipes(recipeFiltered);
        console.timeEnd("label");
    }
    if (inputValue.length == 2) {
        displayRecipes(allRecipes);
    }
};

export {
    dropdownToggle,
    removeFilterItem,
    emptyInputValue,
    toggleCrossInput,
    displayRecipes,
    displayFilterOptions,
    addFilterOptionSelected,
    searchRecipe,
};
