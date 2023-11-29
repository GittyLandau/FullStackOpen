const express = require("express");
const app = express();
// const cors = require("cors");
//use
app.use(express.json());
// app.use(cors);
const unknownEndpoint = (request, response) => {
  response.status(404).json({ error: "Unknown endpoint" });
};
const cors = require("cors");
app.use(express.static("dist"));
app.use(cors());
///morgan
const morgan = require("morgan");
morgan.token("person", (request, response) => {
  console.log(request.body);
  return JSON.stringify(request.body);
});

app.use(
  morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      tokens.person(req, res),
    ].join(" ");
  })
);
//
const generateID = () => {
  return Math.floor(Math.random() * 1000);
};
app.get("/", (request, response) => {
  response.send("<h1>Hello World</h1>");
});
app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/info", (request, response) => {
  const currentDate = Date();
  response.send(
    `<p>Phonebook has info for ${persons.length} people.</p><p>${currentDate}</p>`
  );
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    // console.log("NO");
    // response.status(404).end;
    return response.status(404).json({ error: "Person not found" });
  }
});
app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => {
    person.id !== id;
  });
  response.status(204).end();
});
app.post("/api/persons", (request, response) => {
  const body = request.body;
  //check for existing name

  if (body.name && body.number) {
    if (persons.find((person) => person.name == body.name)) {
      response.status(400).json({ error: `Name must be unique` });
    } else {
      persons.concat({
        id: generateID(),
        name: body.name,
        number: body.number,
      });
      response.status(200).json({ message: `Added successfully` });
    }
  } else {
    response.status(400).json({ error: "Some information is missing" });
  }
});
let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "fjAda Lovelace",
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
app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
