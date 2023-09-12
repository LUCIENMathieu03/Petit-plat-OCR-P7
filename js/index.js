import constants from "./constants.js";
import recipesCard from "./templates/recipeCard.js";
import RecipeModel from "./models/recipeModel.js";
import recipeApi from "./api.js";

class App {
    constructor() {
        this.recipeApi = new recipeApi("./data/recipes copy.js");
    }

    displayRecipes(recipes) {
        recipes
            .map((recipe) => new RecipeModel(recipe))
            .forEach((recipe) => {
                // console.log(recipe.ingredients);
                const recipeToDisplay = new recipesCard(recipe);
                const recipeDom = recipeToDisplay.getRecipeCard();
                constants.recipesResult.appendChild(recipeDom);
            });
    }

    async main() {
        const recipesData = await this.recipeApi.getRecipes();
        // console.log(recipesData);
        this.displayRecipes(recipesData.recipes);
    }
}

const recipeApp = new App();

recipeApp.main();
