
// Mogelijke option TYPES 

const optionIDs = ["largeSize", "onions", "mayo", "curry", "turk"];
const mainOptionIDs = ["largeSize", "onions", "mayo", "curry"];
const optionsConverted = {
	"onions": "Uitjes",
	"mayo": "Mayo",
	"curry": "Curry",
	"largeSize": "Grote portie",
	"turk": "Domme Turk"
}
const optionPricings = {
	"onions": 50,
	"mayo": 50,
	"curry": 50,
	"largeSize": 75,
	"turk": 5e3
}


class Item {
	constructor(name, cents, category, optionTypes = []) {
		this.name = name;
		this.price = cents;
		this.category = category;
		this.amount = 0;
		this.max = 9;

		this.collapsed = true;

		this.options = {}
		for(let id of optionIDs) {
			this.options[id] = optionTypes.includes(id) ? "false" : null;
		}

	}
}

function loadStock() {

	let stock = [];

	// Friet
	stock.push(new Item("Oerfriet zonder", 180, "friet", ["largeSize", "onions", "curry"]));
	stock.push(new Item("Oerfriet met mayo", 210, "friet", mainOptionIDs));
	stock.push(new Item("Oerfriet speciaal", 240, "friet", mainOptionIDs));
	stock.push(new Item("Oerfriet pindasaus", 270, "friet", mainOptionIDs));
	stock.push(new Item("Oerfriet oorlog", 290, "friet", mainOptionIDs));
	stock.push(new Item("Oerfriet super", 400, "friet", mainOptionIDs));
	stock.push(new Item("Oerfriet super oorlog", 450, "friet", mainOptionIDs));
	stock.push(new Item("Oerfriet kipcorn super", 470, "friet", mainOptionIDs));
	stock.push(new Item("Oerfriet braadworst", 470, "friet", mainOptionIDs));
	stock.push(new Item("Oerfriet waterfiets", 520, "friet", mainOptionIDs));
	stock.push(new Item("Friet br. worst oorlog", 500, "friet", mainOptionIDs));

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
	stock.push(new Item("Ons paradepaardje Twentse bal uit de jus", 210, "other", ["turk"]));
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