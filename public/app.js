document.addEventListener("click", async ({ target }) => {
	if (target.getAttribute("data-type") === "remove") {
		const idNote = target.getAttribute("data-id")
		remove(idNote).then(() => {
			target.closest("li").remove()
		})
	}
	if (target.getAttribute("data-type") === "edit") {
		const defaultValue = target.closest("li").innerText.split("E")[0].slice(0, -1)
		const result = prompt("Введите новое название", defaultValue)
		if (result && (result !== defaultValue)) {
			const id = target.getAttribute("data-id")
			edit(id, result).then(() => {
				target.closest("li").firstChild.nodeValue = result
			})
		}
	}
})

async function edit (id, result) {
	try {
		await fetch(`/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ title: result })
		})
	} catch (error) {
		console.log("Error edit:", error)
	}
}

async function remove (idNote) {
	try {
		await fetch(`/${idNote}`, {
			method: "DELETE",
		})
	} catch (err) {
		console.log("Error delete", err)
	}
}