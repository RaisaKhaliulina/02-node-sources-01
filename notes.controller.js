const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const notesPath = path.join(__dirname, "db.json");

async function addNotes(title) {
  const notes = await getNotes();
  const note = { title, id: Date.now().toString() };

  notes.push(note);
  await fs.writeFile(notesPath, JSON.stringify(notes))

	console.log(chalk.green.inverse("Note added!"))
}

async function getNotes() {
	const notes = await fs.readFile(notesPath, { encoding: "utf-8" })
	return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}

async function editNote(id, body) {
	const notes = await getNotes()
	const index = notes.findIndex(note => note.id === id)
	notes[index] = {...notes[index], ...body}
	try {
		await fs.writeFile(notesPath, JSON.stringify(notes))
		console.log(chalk.yellow.inverse(`Note by id: ${id} edit`))
	} catch (error) {
		console.log("Error write update file", error)
	}
}

async function removeNote(id) {
	const notes = await getNotes()
	const newArrayNotes = notes.filter(note => note.id !== id)
	await fs.writeFile(notesPath, JSON.stringify(newArrayNotes))
	console.log(chalk.red.inverse(`Note ${id} deleted!`))
}

async function printNotes() {
	const notes = await getNotes()
	console.log(chalk.blue.inverse("This is list of notes: "))
	notes.forEach(note => {
		console.log(chalk.yellow.inverse(`Title: ${note.title}, ID: ${note.id}, Tag: ${note.tag}`))
	})
}

module.exports = {
	addNotes,
	printNotes,
	removeNote,
	getNotes,
	editNote
}