const yargs = require("yargs");
const pkg = require("./package.json");
const { addNote, printNotes, removeNote, editNote } = require("./notes.controller")

yargs.version(pkg.version)

yargs.command({
  command: "add",
  describe: "Add new note to list",
  builder: {
    title: {
      type: "string",
      describe: "Note title",
      demandOption: true
    }
  },
  handler({ title }) {
    addNote(title)
  }
})

yargs.command({
  command: "edit",
  describe: "Edit note by id",
  builder: {
    id: {
      type: "string",
      describe: "Note id",
      demandOption: true,
    },
    title: {
      type: "string",
      describe: "Note title",
      demandOption: true,
    },
  },
  async handler({ id, title }) {
    await editNote(id, title);
  },
});


yargs.command({
  command: "list",
  describe: "Print all notes",
  async handler() {
    printNotes({id, title})
  }
})

yargs.remove({
  command: "delete",
  describe: "Remove note by id",
   builder: {
    id: {
      type: "string",
      describe: "Delete id",
      demandOption: true,
    },
  },
  async handler({id}) {
    await removeNote(id);
  }
});

yargs.parse()
