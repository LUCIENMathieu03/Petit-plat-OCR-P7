export default class RecipeModel {
    constructor(data) {
        this._title = data.name;
        this._image = data.image;
        this._ingredients = data.ingredients;
        this._time = data.time;
        this._description = data.description;
        //not adding all data
    }

    get title() {
        return this._title;
    }

    get image() {
        return `./assets/images/${this._image}`;
    }

    get ingredients() {
        return this._ingredients;
    }

    get duration() {
        return this._time;
    }

    get description() {
        return this._description;
    }
}
