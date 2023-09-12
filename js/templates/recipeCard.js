export default class recipesCard {
    constructor(recipe) {
        this.recipe = recipe;
    }

    getRecipeCard() {
        const article = document.createElement("article");
        const duration = document.createElement("div");
        const img = document.createElement("img");
        const cardContent = document.createElement("div");
        const cardContentRecipe = document.createElement("div");
        const title = document.createElement("h2");
        let ingredientsDOM = "";

        article.classList.add(
            "w-[300px]",
            "sm:w-[380px]",
            "bg-white",
            "rounded-[21px]",
            "shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]",
            "relative"
        );

        duration.classList.add(
            "bg-[#FFD15B]",
            "inline-block",
            "px-[15px]",
            "py-[5px]",
            "rounded-[14px]",
            "absolute",
            "top-[21px]",
            "right-[22px]"
        );
        duration.innerHTML = `${this.recipe.duration} min`;

        img.classList.add(
            "object-cover",
            "h-[253px]",
            "w-full",
            "rounded-tl-[21px]",
            "rounded-tr-[21px]"
        );
        img.setAttribute("src", this.recipe.image);
        img.setAttribute("alt", this.recipe.title);

        cardContent.classList.add("mt-[32px]", "mb-[61px]", "mx-[25px]");

        title.classList.add("font-['Anton']", "text-[18px]");
        title.innerHTML = this.recipe.title;

        //create DOM for each ingredient elements
        let ingredientsTab = this.recipe.ingredients;

        ingredientsTab.map((ingredient) => {
            ingredientsDOM += `<div class="text-[14px]">
                                <p class="font-[500]">
                                    ${ingredient.ingredient}
                                </p>
                                <p class="text-[#7A7A7A]">
                                    ${
                                        ingredient.quantity
                                            ? ingredient.quantity
                                            : ""
                                    } 
                                    ${
                                        ingredient.unit
                                            ? ingredient.unit === "grammes"
                                                ? "g"
                                                : ingredient.unit
                                            : ""
                                    } 
                                </p>
                            </div>`;
        });

        //DOM for the actual recipe
        cardContentRecipe.innerHTML = ` <div class="mt-[29px]">
                                            <h3 class="text-[12px] font-[700] text-[#7A7A7A] tracking-[9%]">
                                                RECETTE
                                            </h3> 
                                            <p class="mt-[15px] text-[14px]">
                                                ${this.recipe.description}
                                            </p>
                                            <h3 class="text-[12px] font-[700] text-[#7A7A7A] mt-[32px] tracking-[9%]" >
                                                INGRÉDIENTS
                                            </h3>
                                            <div class="mt-[15px] grid gap-[21px] grid-cols-2">
                                                ${ingredientsDOM}
                                            </div>
                                        </div>`;

        cardContent.appendChild(title);
        cardContent.appendChild(cardContentRecipe);

        article.appendChild(duration);
        article.appendChild(img);
        article.appendChild(cardContent);

        return article;
    }
}
