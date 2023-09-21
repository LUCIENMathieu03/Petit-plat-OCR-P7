export default class FilterModel {
    constructor(data) {
        this._ingredients = data.ingredients;
        this._appliance = data.appliance;
        this._ustensils = data.ustensils;
    }

    get ingredients() {
        return this._ingredients;
    }
    get appliance() {
        return this._appliance;
    }
    get ustensils() {
        return this._ustensils;
    }
}
