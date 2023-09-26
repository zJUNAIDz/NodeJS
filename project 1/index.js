//* Create an endpoint which will send genre as response with CRUD operations [COMPLETED ✅]
//* genre list we gonna use by default
// import Genres from "./Genres";
const Genres = require("./Genres");
const express = require("express");
const app = express();
app.use(express.json());
//* GET all genres
app.get("/api/genres", (req, res) => {
  res.send(Genres);
});
//*GET specific genre
app.get("/api/genres/:id", (req, res) => {
  const genre = Genres.find((genre) => genre.id === +req.params.id);
  if (!genre) {
    res.status(404).send("Genre with provided key not found");
    return;
  }
  res.send(genre);
});
//*ADD a genre
app.post("/api/genres", (req, res) => {
  if (!req.body.name || !req.body.description) {
    res.status(400).send("'name' and 'description' field is required");
    return;
  }
  const genre = {
    id: Genres.length + 1,
    name: req.body.name,
    description: req.body.description,
  };

  Genres.push(genre);
  res.send(genre);
});
//*UPDATE a genre
app.put("/api/genres/:id", (req, res) => {
  if (!req.body.name || !req.body.description) {
    res.status(400).send("Both 'name' and 'description' are required");
    return;
  }
  const index = Genres.findIndex((genre) => genre.id === +req.params.id);
  if (index === -1) {
    res.status(404).send("Genre with given ID not found!");
    return;
  }
  Genres[index] = {
    ...Genres[index],
    name: req.body.name,
    description: req.body.description,
  };
  res.send(Genres[index]);
});
//*DELETE a genre
app.delete("/api/genres/:id", (req, res) => {
  const index = Genres.findIndex((genre) => genre.id === +req.params.id);
  if (index === -1) {
    res.status(404).send("Genre with provided ID doesn't exist");
    return;
  }
  const genre = Genres[index];
  Genres.splice(index, 1);
  res.send(genre);
});
//*listen to a port
app.listen(3000);
