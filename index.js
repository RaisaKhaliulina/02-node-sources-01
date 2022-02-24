const chalk = require("chalk");
const path = require("path");
const { addNote, getNotes, removeNote, editNote } = require("./notes.controller")
const express = require("express");

const port = 3000;
const app = express()

app.set("view engine", "ejs")
app.set("views", "pages")
//app.use(express.join())
app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({
  extended: true
}))

app.put("/:id", async (req, res) => {
	try {
		await editNote(req.params.id, req.body)
		res.render("index", {
			title: "Express App",
			notes: await getNotes(),
			create: false
		})
	} catch (error) {
		console.log("Error update serve", error)
	}
})

app.get("/", async (req, res) => {

  //res.sendFile(path.join(basePath, "index.html"))
  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
    created: false
  })
})

app.post("/", async (req, res) => {
	try {
		await addNote(request.body.title)
		res.render("index", {
			title: "Express App",
			notes: await getNotes(),
			create: true
		})
	} catch (err) {
		console.log("Error add: ", err)
	}
})

app.delete("/:id", async (req, res) => {
	try {
		await removeNote(req.params.id)
		res.render("index", {
			title: "Express App",
			notes: await getNotes(),
			create: false
		})
	} catch (err) {
		console.log(err)
	}
})

app.listen(port, () => {
	console.log(chalk.green.inverse(`Server has been started on ${port} port`))
})