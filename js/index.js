import recipeApi from "./api.js";
import { listener } from "./listener.js";
import { displayRecipes, displayFilterOptions } from "./functions.js";

class App {
    constructor() {
        this.recipeApi = new recipeApi("./data/recipes.json");
    }

    async main() {
        const recipesData = await this.recipeApi.getRecipes();
        displayRecipes(recipesData.recipes);
        displayFilterOptions(recipesData.recipes);
        listener();
    }
}

const recipeApp = new App();

recipeApp.main();
