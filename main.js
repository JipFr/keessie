
function setPage(href) {
	document.querySelectorAll("[data-page]").forEach(el => {
		el.classList.remove("show");
	});
	document.querySelectorAll(".navItem").forEach(el => {
		el.classList.remove("focused");
	})
	let div = document.querySelector(`[data-page="${href}"]`);
	if(div) {
		div.classList.add("show");
		document.querySelector(`[data-href="${href}"]`).classList.add("focused");
	}
}