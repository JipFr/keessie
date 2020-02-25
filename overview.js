
async function init() {
	let allRequests = await getRequests();
	console.log(allRequests);
}

window.addEventListener("load", init);