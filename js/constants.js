const recipesResult = document.querySelector(".recipesResult");
const dropdownUstensils = document.querySelector(".dropdown__ustensils");
const dropdownDevices = document.querySelector(".dropdown__devices ");
const dropdownIngredients = document.querySelector(".dropdown__ingredients");
const inputCross = document.querySelectorAll(".emptyInput");
const searchInputs = document.querySelectorAll("input");
const tagContainer = document.querySelector(".filtersResult");
let tagButton = document.querySelectorAll(".filtersResult_item button");
let filterOptions = document.querySelectorAll(".optionsChoice li");

const domElements = {
    recipesResult,
    dropdownDevices,
    dropdownIngredients,
    dropdownUstensils,
    tagContainer,
    tagButton,
    inputCross,
    searchInputs,
    filterOptions,
};

export default domElements;
