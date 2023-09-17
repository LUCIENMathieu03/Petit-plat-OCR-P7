const recipesResult = document.querySelector(".recipesResult");
const dropdownUstensils = document.querySelector(".dropdown__ustensils");
const dropdownDevices = document.querySelector(".dropdown__devices ");
const dropdownIngredients = document.querySelector(".dropdown__ingredients");
const inputCross = document.querySelectorAll(".emptyInput");
const searchInputs = document.querySelectorAll("input");
const filtersResultItemButton = document.querySelectorAll(
    ".filtersResult_item button"
);

const domElements = {
    recipesResult,
    dropdownDevices,
    dropdownIngredients,
    dropdownUstensils,
    filtersResultItemButton,
    inputCross,
    searchInputs,
};

export default domElements;
