
const dweet_name = "ictmaatwerk-friet-dev2";

async function sendRequests() {
	const name = prompt("Namens wie?");
	if(!name) return null;
	let mappedEntry = {
		from: name,
		wishes: JSON.stringify(getSelected().map(sel => {
			return {
				amount: sel.amount,
				item: sel.name
			}
		}))
	}
	dweetio.dweet_for(dweet_name, mappedEntry, (err, dweet) => {
		if(err) {
			alert("Er ging iets mis: " + err);
			throw err;
		}
		console.log(dweet.thing);
		alert("Je wensen zijn verstuurd")
	});
	console.log(mappedEntry);
	
}

function getRequests() {
	dweetio.get_all_dweets_for(dweet_name, (err, dweets) => {

		// Dweets is an array of dweets
		console.log(dweets);
		for(let dweet of dweets) {
			console.log(dweet.content);
		}
	
	});
}