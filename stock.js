
// const firebase = require("firebase");


class Item {
	constructor(name, cents, category) {
		this.name = name;
		this.price = cents;
		this.category = category;
		this.amount = 0;
		this.calculated = {}
		this.max = 9;
	}
}

function loadStock() {

	let stock = [];

	// Friet
	stock.push(new Item("Oerfriet zonder", 180, "friet"));
	stock.push(new Item("Oerfriet met mayo", 210, "friet"));
	stock.push(new Item("Oerfriet speciaal", 240, "friet"));
	stock.push(new Item("Oerfriet pindasaus", 270, "friet"));
	stock.push(new Item("Oerfriet oorlog", 290, "friet"));
	stock.push(new Item("Oerfriet super", 400, "friet"));
	stock.push(new Item("Oerfriet super oorlog", 450, "friet"));
	stock.push(new Item("Oerfriet kipcorn super", 470, "friet"));
	stock.push(new Item("Oerfriet braadworst", 470, "friet"));
	stock.push(new Item("Oerfriet waterfiets", 520, "friet"));
	stock.push(new Item("Friet br. worst oorlog", 500, "friet"));
	// stock.push(new Item("Extra topping", 50, "friet"));
	// stock.push(new Item("Grote portie extra", 75, "friet"));

	// Snacks
	stock.push(new Item("Frikandel", 160, "snack"));
	stock.push(new Item("Frikandel met mayo", 185, "snack"));
	stock.push(new Item("Frikandel speciaal", 220, "snack"));
	stock.push(new Item("Frikandel pindasaus", 220, "snack"));
	stock.push(new Item("Grote kroket 25%", 185, "snack"));
	stock.push(new Item("Bami / Nasischijf", 185, "snack"));
	stock.push(new Item("Kaassoufle", 185, "snack"));
	stock.push(new Item("Mexikano", 210, "snack"));
	stock.push(new Item("Loempia's", 140, "snack"));
	stock.push(new Item("Braadworst", 210, "snack"));
	stock.push(new Item("Kipcorn", 210, "snack"));

	// Other
	stock.push(new Item("Ons paradepaardje Twense bal uit de jus", 210, "other"));
	stock.push(new Item("Broodje hamburger vers van de plaat edition", 260, "other"));
	stock.push(new Item("Cheeseburger vers van de plaat + uien", 340, "other"));
	stock.push(new Item("Boordje braadworst", 380, "other"));
	stock.push(new Item("Gekoelde dranken, blinkjes", 150, "other"));
	stock.push(new Item("Flesje 0,5ltr.", 200, "other"));

	let stockCategories = {}
	stock.forEach(item => {
		if(!stockCategories[item.category]) {
			stockCategories[item.category] = [];
		}
		stockCategories[item.category].push(item);
	});
	
	return stockCategories;

}