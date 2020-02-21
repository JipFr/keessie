
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

function getTotal() {
	let total = getSelected().map(item => item.amount * item.price).reduce((a, b) => a += b, 0)
	return total;
}


let myComp = Vue.component("stock-card", {
	props: ["name", "price", "amount", "max"],
	data: () => {
		return {
			stock
		}
	},
	filters: {
		toPrice
	},
	methods: {
		addOne() {
			let amount = this.amount < this.max ? this.amount + 1 : this.amount;
			this.$emit("update", "amount", amount, this.name);
		},
		removeOne() {
			let amount = this.amount >= 1 ? this.amount - 1 : this.amount;
			this.$emit("update", "amount", amount, this.name);
		}
	},
	template: `
	<div class="stockItem card">
		<div class="cardMain cardLayout">
			<div class="cardCore">
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
					<p class="secondary price">{{price * amount | toPrice}}</p>
				</div>
			</aside>
		</div>
		<div class="cardExtra">
			<hr>
			<div class="choices">
				<div class="choice" data-option="onions">
					<button class="customCheckmark smallBtn" data-checked="true">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-minus"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
					</button>
					<p>Uitjes</p>
				</div>
				<div class="choice" data-option="curry">
					<button class="customCheckmark smallBtn" data-checked="true">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-minus"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
					</button>
					<p>Curry</p>
				</div>
				<div class="choice" data-option="mayo">
					<button class="customCheckmark smallBtn" data-checked="false">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-minus"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
					</button>
					<p>Mayo</p>
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
		getSelected,
		search,
		getTotal
	}
});
