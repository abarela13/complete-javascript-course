import uniqid from "uniqueid";

export default class List {
	constructor() {
		this.items = [];
	}

	addItem(count, unit, ingredient) {
		const item = {
			id: uniqid(),
			count,
			unit,
			ingredient
		};
    }
    
    deleteItem(id) {
        this.items.splice()
    }
}
