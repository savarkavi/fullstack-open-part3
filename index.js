const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

let data = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (req, res) => {
  res.json(data);
});

app.get("/info", (req, res) => {
  const date = new Date();
  const totalEntries = data.length;
  res.send(`<p>Phonebook has ${totalEntries} entries</p> <p>${date}</p>`);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = data.find((person) => person.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  data = data.filter((person) => person.id !== id);

  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const randomId = Math.floor(Math.random() * 99999);

  if (!req.body.name) {
    return res.status(400).send("name is missing");
  } else if (!req.body.number) {
    return res.status(400).send("number is missing");
  }

  const newEntry = { ...req.body, id: randomId };

  if (data.find((person) => person.name === newEntry.name)) {
    return res.status(400).send("name already exists");
  }

  data = data.concat(newEntry);
  res.json(newEntry);
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
