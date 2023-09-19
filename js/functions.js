import domElements from "./constants.js";
import recipesCard from "./templates/recipeCard.js";
import filterOption from "./templates/filterOption.js";
import RecipeModel from "./models/RecipeModel.js";
import FilterModel from "./models/FilterModel.js";

//
//Display all the recipes
//
function displayRecipes(data) {
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
    filter.parentNode.removeChild(filter);
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

const addFilterOptionSelected = (e) => {
    const selectedOptionToDisplay = new filterOption();
    const selectedOptionDom = selectedOptionToDisplay.getSelectedOption(
        e.target.innerText
    );
    console.log(domElements.filtersResultItemDiv);
    domElements.filtersResultItemDiv.appendChild(selectedOptionDom);
};

export {
    dropdownToggle,
    removeFilterItem,
    emptyInputValue,
    toggleCrossInput,
    displayRecipes,
    displayFilterOptions,
    addFilterOptionSelected,
};