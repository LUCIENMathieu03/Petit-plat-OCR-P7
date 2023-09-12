export default class recipeApi {
    constructor(url) {
        this._url = url;
    }

    async getRecipes() {
        const res = await fetch(this._url);
        const data = await res.json();

        return data;
    }
}
