const express = require("express");
const router = express.Router();
const genres = require("../data/genres");

//* GET all genres
router.get("/", (req, res) => {
  res.send(genres);
});
//*GET specific genre
router.get("/:id", (req, res) => {
  const genre = genres.find((genre) => genre.id === +req.params.id);
  if (!genre) {
    res.status(404).send("Genre with provided key not found");
    return;
  }
  res.send(genre);
});
//*ADD a genre
router.post("/", (req, res) => {
  if (!req.body.name || !req.body.description) {
    res.status(400).send("'name' and 'description' field is required");
    return;
  }
  const genre = {
    id: genres.length + 1,
    name: req.body.name,
    description: req.body.description,
  };

  genres.push(genre);
  res.send(genre);
});
//*UPDATE a genre
router.put("/:id", (req, res) => {
  if (!req.body.name || !req.body.description) {
    res.status(400).send("Both 'name' and 'description' are required");
    return;
  }
  const index = genres.findIndex((genre) => genre.id === +req.params.id);
  if (index === -1) {
    res.status(404).send("Genre with given ID not found!");
    return;
  }
  genres[index] = {
    ...genres[index],
    name: req.body.name,
    description: req.body.description,
  };
  res.send(genres[index]);
});
//*DELETE a genre
router.delete("/:id", (req, res) => {
  const index = genres.findIndex((genre) => genre.id === +req.params.id);
  if (index === -1) {
    res.status(404).send("Genre with provided ID doesn't exist");
    return;
  }
  const genre = genres[index];
  genres.splice(index, 1);
  res.send(genre);
});

module.exports = router;
