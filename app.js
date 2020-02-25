
Vue.config.devtools = true;

const stock = loadStock();
const stockCategories = Object.keys(stock);
const allStock = Object.values(stock).flat();

const euro = 100;

function toPrice(cents) {
	return (cents / 100).toLocaleString("nl", {
		style: "currency",
		currency: "eur"
	});
}

function convertCategory(cat) {
	if(cat === "friet") return "Friet";
	if(cat === "snack") return "Snacks";
	if(cat === "other") return "Overig FastFood en Dranken";
	return "Onbekend";
}

function getSearch(cat) {
	return `In ${convertCategory(cat).toLowerCase()} zoeken...`
}

function search(evt) {
	let el = evt.target;
	let terms = el.value.toLowerCase().trim().split(", ");
	let wrapperDiv = el.closest(".category");
	let cards = [...wrapperDiv.querySelectorAll(".card")];
	
	for(let card of cards) {
		let txt = card.querySelector(".title").innerText.trim().toLowerCase();
		if(terms.find(q => txt.includes(q)) || terms[0] == "") {
			card.classList.remove("hidden");
		} else {
			card.classList.add("hidden");
		}
	}

}

function getSelected() {
	return allStock.filter(item => item.amount > 0);
}

function getItemTotal(name) {
	let item = allStock.find(item => item.name === name);

	let total = 0;

	let itemNoOptions = item.price * item.amount;

	let selectedOptions = Object.keys(item.options).filter(key => item.options[key] === "true");
	let optionPrices = selectedOptions.map(option => optionPricings[option]);

	total += itemNoOptions;
	for(let price of optionPrices) {
		total += price;
	}

	return total;
}

function getTotal() {
	let total = getSelected().map(item => getItemTotal(item.name)).reduce((a, b) => a += b, 0)
	return total;
}

function convertOption(key) {
	return optionsConverted[key];
}

let myComp = Vue.component("stock-card", {
	props: ["name", "price", "amount", "max", "options", "collapsed"],
	data: () => {
		return {
			stock,
			optionIDs,
			optionPricings
		}
	},
	filters: {
		toPrice,
		convertOption,
		hasOpts(options) {

			// See if there's enabled options, 
			// to see if there should be a collapse button

			// If not, all values will be null

			return Object.values(options).find(i => i) ? "true" : "false";
		},
		getPrice(key) {
			return optionPricings[key];
		},
		toOptionString(options) {
			let optionKeys = Object.keys(options).filter(option => options[option] === "true");
			console.log(optionKeys);
			let optionString = optionKeys.map((option, index) => {
				return convertOption(option)[index !== 0 ? "toLowerCase" : "toString"]();
			}).join(", ");
			return optionString;
		}
	},
	methods: {
		getItemTotal,
		addOne() {
			let amount = this.amount < this.max ? this.amount + 1 : this.amount;
			this.$emit("update", "amount", amount, this.name);
		},
		removeOne() {
			let amount = this.amount >= 1 ? this.amount - 1 : this.amount;
			this.$emit("update", "amount", amount, this.name);
		},
		toggleCollapse(evt) {
			
			let name = evt.target.closest(".card").querySelector(".title").innerText;
			let relevantItem = Object.values(this.stock).flat().find(item => item.name === name);
			let toSet = !relevantItem.collapsed;

			this.$emit("reset-collapse");
			this.$emit("update", "collapsed", toSet, name);
		},
		getoptionBool(options, key) {
			return options[key] ? options[key] : null;
		},
		showCardExtra(options) {
			return Object.values(options).find(i => i) ? true : false;
		},
		toggleOpt(thing) {
			let name = thing.target.closest(".card").querySelector(".title").innerText;
			let el = thing.target.closest("[data-option]");
			let opt = el.dataset.option;
			this.$emit("update-opt", name, opt);
		}
	},
	template: `
	<div class="stockItem card" v-bind:data-collapsed="collapsed.toString()" v-bind:data-has-opts="options | hasOpts">
		<div class="cardMain cardLayout">
			<div class="cardCore">
				<p class="extras">{{ options | toOptionString}}</p>
				<h3 class="title">{{ name }}</h3>
				<h4 class="price">{{ price | toPrice }}</h4>
			</div>
			<aside class="cardSide">
				<div class="inputDiv countInput">
					<button class="minusButton smallBtn" v-on:click="removeOne">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-minus"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
					</button>
					<p>{{ amount }}</p>
					<button class="plusButton smallBtn" v-on:click="addOne">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
					</button>
				</div>
				<div class="itemTotal">
					<p class="secondary price">{{getItemTotal(name) | toPrice}}</p>
				</div>
			</aside>
			<div class="extendOptions" v-on:click="toggleCollapse">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>
			</div>
		</div>
		<div class="cardExtra" v-if="showCardExtra(options)">
			<div class="choices">
				
				<div class="choice" v-bind:data-option="key" v-for="key of optionIDs" v-if="getoptionBool(options, key)" v-on:click="toggleOpt" v-bind:data-checked="getoptionBool(options, key).toString()">
					<button class="customCheckmark smallBtn">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-minus"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
					</button>
					<p>{{ key | convertOption }}</p>
					<span class="price">{{key | getPrice | toPrice}}</span>
				</div>

			</div>
		</div>
	</div>
	`
});

const myApp = new Vue({
	el: "#app",
	data: {
		stock,
		stockCategories,
		getSearch
	},
	filters: {
		toPrice,
		convertCategory
	},
	methods: {
		update(key, value, name) {
			allStock.find(item => item.name === name)[key] = value;
		},
		updateOpt(name, opt) {
			let item = allStock.find(item => item.name === name);
			item.options[opt] = item.options[opt] === "true" ? "false" : "true";
		},
		resetCollapse() {
			allStock.forEach(item => item.collapsed = true);
		},
		getSelected,
		search,
		getTotal
	}
});
