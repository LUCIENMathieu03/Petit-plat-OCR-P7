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
        const ingredientOptionDom = optionToDisplay.getOption(
            ingredient,
            "ingredient"
        );
        domElements.dropdownIngredients
            .querySelector(".optionsChoice")
            .appendChild(ingredientOptionDom);
    });
    appliances.sort().map((appliance) => {
        const optionToDisplay = new filterOption();
        const applianceOptionDom = optionToDisplay.getOption(
            appliance,
            "appareil"
        );
        domElements.dropdownDevices
            .querySelector(".optionsChoice")
            .appendChild(applianceOptionDom);
    });
    ustensils.sort().map((ustensil) => {
        const optionToDisplay = new filterOption();
        const ustensilsOptionDom = optionToDisplay.getOption(
            ustensil,
            "ustensil"
        );
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
    if (input.id == "search") {
        searchRecipe(domElements.mainInput.value);
    }
    e.target.parentNode.classList.add("hidden");
    //verifier si on est dans le main input et lancer la recherche si on est dedans
};

//
//for listener: remove a selected filter item
//
const removeFilterItem = (event) => {
    const filter = event.target.closest(".filtersResult_item");
    const parentElem = filter.parentNode;

    //Remove also the unselected option in the global array for the search engine
    const removeInGlobalObject = (array) => {
        return array.filter((item) => {
            if (!(filter.querySelector("p").innerText == item)) {
                return item;
            }
        });
    };
    selectedOptions.ingredients = removeInGlobalObject(
        selectedOptions.ingredients
    );
    selectedOptions.appareils = removeInGlobalObject(selectedOptions.appareils);
    selectedOptions.ustensiles = removeInGlobalObject(
        selectedOptions.ustensiles
    );

    console.log(domElements.mainInput.value);
    searchRecipe(domElements.mainInput.value);

    parentElem.removeChild(filter);

    //recalculate the existing tag button
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
        const selectedOptionToDisplay = new filterOption();
        const selectedOptionDom = selectedOptionToDisplay.getSelectedOption(
            e.target.innerText
        );
        domElements.tagContainer.appendChild(selectedOptionDom);

        //Adding selected option in the global object for the search engine
        if (e.target.classList.contains("ingredient")) {
            selectedOptions.ingredients.push(e.target.innerText);
        } else if (e.target.classList.contains("appareil")) {
            selectedOptions.appareils.push(e.target.innerText);
        } else if (e.target.classList.contains("ustensil")) {
            selectedOptions.ustensiles.push(e.target.innerText);
        }
        console.log(selectedOptions);

        searchRecipe(domElements.mainInput.value);

        //Adding deleteTag event only on new tag button
        selectedOptionDom
            .querySelector("button")
            .addEventListener("click", (e) => removeFilterItem(e));
    }
};

//Search engine
const searchRecipe = (inputValue) => {
    //Search w/o tag
    if (
        inputValue.length >= 3 &&
        selectedOptions.ingredients.length == 0 &&
        selectedOptions.appareils.length == 0 &&
        selectedOptions.ustensiles.length == 0
    ) {
        console.time("timing");

        //empty the array to not have repetition
        recipeFiltered = [];

        recipeFiltered = allRecipes.filter((recipe) => {
            let titre = recipe.name.toLowerCase();
            let description = recipe.description.toLowerCase();
            let ingredientArray = [];
            // let appliance = recipe.appliance;
            // let ustensilArray = recipe.ustensils;

            ingredientArray = recipe.ingredients.map(
                (ingredient) => ingredient.ingredient
            );

            if (
                titre.includes(inputValue.toLowerCase()) ||
                description.includes(inputValue.toLowerCase()) ||
                ingredientArray.join(" ").includes(inputValue.toLowerCase())
            ) {
                return recipe;
            }
        });

        console.log(recipeFiltered);
        console.timeEnd("timing");

        displayRecipes(recipeFiltered);
        displayFilterOptions(recipeFiltered);
    }
    //Search with tag and text (if the input is filled)
    if (
        selectedOptions.ingredients.length ||
        selectedOptions.appareils.length ||
        selectedOptions.ustensiles.length
    ) {
        //empty the array to not have repetition
        recipeFiltered = [];

        recipeFiltered = allRecipes.filter((recipe) => {
            let titre = recipe.name.toLowerCase();
            let description = recipe.description.toLowerCase();
            let appliance = recipe.appliance.toLowerCase();
            let ustensilArray = recipe.ustensils.map((ustensil) =>
                ustensil.toLowerCase()
            );
            let ingredientArray = recipe.ingredients.map((ingredient) =>
                ingredient.ingredient.toLowerCase()
            );

            let canBeAdd = true;

            if (selectedOptions.ingredients.length > 0) {
                for (let ingre of selectedOptions.ingredients) {
                    let isIn = false;
                    for (let arrayIngre of ingredientArray) {
                        if (ingre.toLowerCase() === arrayIngre) {
                            isIn = true;
                        }
                    }

                    if (
                        !isIn
                        //!ingredientArray.join(" ").includes(ingre.toLowerCase())
                    ) {
                        canBeAdd = false;
                    }
                }
            }

            if (selectedOptions.appareils.length > 0) {
                for (let app of selectedOptions.appareils) {
                    if (!appliance.includes(app.toLowerCase())) {
                        canBeAdd = false;
                    }
                }
            }

            if (selectedOptions.ustensiles.length > 0) {
                for (let ust of selectedOptions.ustensiles) {
                    if (!ustensilArray.join(" ").includes(ust.toLowerCase())) {
                        canBeAdd = false;
                    }
                }
            }

            if (inputValue.length >= 3) {
                console.log(
                    titre.includes(inputValue.toLowerCase()) ||
                        description.includes(inputValue.toLowerCase()) ||
                        ingredientArray
                            .join(" ")
                            .includes(inputValue.toLowerCase())
                );
                if (
                    !(
                        titre.includes(inputValue.toLowerCase()) ||
                        description.includes(inputValue.toLowerCase()) ||
                        ingredientArray
                            .join(" ")
                            .includes(inputValue.toLowerCase())
                    )
                ) {
                    canBeAdd = false;
                }
            }

            if (canBeAdd == true) {
                return recipe;
            }
        });

        console.log(recipeFiltered);
        displayRecipes(recipeFiltered);
        displayFilterOptions(recipeFiltered);
    }

    if (
        inputValue.length <= 2 &&
        selectedOptions.ingredients.length == 0 &&
        selectedOptions.appareils.length == 0 &&
        selectedOptions.ustensiles.length == 0
    ) {
        displayRecipes(allRecipes);
        displayFilterOptions(allRecipes);
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
