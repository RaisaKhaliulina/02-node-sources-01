const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const notesPath = path.join(__dirname, "db.json");

async function addNote(title) {
  const notes = await getNotes();
  const note = { title, id: Date.now().toString() };

  notes.push(note);
  await saveNotes(notes);
  console.log(chalk.green.inverse("Note was added!"));
}

async function removeNote(id) {
  const notes = await getNotes();
  const filtered = notes.filter((note) => note.id !== id);

  await saveNotes(filtered);
  console.log(chalk.red(`note with id: ${id} removed!`));
}

async function saveNotes(notes) {
  await fs.writeFile(notesPath, JSON.stringify(notes));
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: "utf-8" });

  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function editNote(id, title) {
  const notes = await getNotes();
  const updatedNotes = notes.map((note) => {
    if (note.id === id) {
      return { ...note, title: title };
    } else {
      return note;
    }
  });

  await saveNotes(updatedNotes);
  console.log(chalk.green.inverse(`Note id:${id} updated!`));
}

async function printNotes() {
  const notes = await getNotes();

  console.log(chalk.bgGray("List notes:"));
  notes.forEach((note) => {
    console.log(`${chalk.green(`id: ${note.id}`)} - ${chalk.blue(note.title)}`);
  });
}

module.exports = {
  addNote,
  removeNote,
  printNotes,
  editNote,
};