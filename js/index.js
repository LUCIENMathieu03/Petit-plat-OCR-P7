import recipeApi from "./api.js";
import { listener } from "./listener.js";
import { displayRecipes, displayFilterOptions } from "./functions.js";

//allRecipe is a global variable

class App {
    constructor() {
        this.recipeApi = new recipeApi("./data/recipes.json");
    }

    async main() {
        const recipesData = await this.recipeApi.getRecipes();
        allRecipes = recipesData.recipes;
        displayRecipes(allRecipes);
        displayFilterOptions(allRecipes);
        listener();
    }
}

const recipeApp = new App();

recipeApp.main();
