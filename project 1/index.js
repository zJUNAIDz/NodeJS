//* Create an endpoint which will send genre as response with CRUD operations [COMPLETED ✅]
//* genre list we gonna use by default
// import Genres from "./Genres";
const genres = require("./Genres");
const express = require("express");
const log = require("../Custom Middleware/logger");
const helmet = require("helmet");
const morgan = require("morgan");
const config = require("config");
const app = express();

//* Loading Middlewares
app.use(express.json());
//*custom middleware
// app.use(log);

//*Built-in Middleware
//* 1]
//it converts the string queries of url(key=value&key=value....) into JSON and populates it in re.body 😀
//now we can pass our key values (name) in body x-www-form-urlencoded
//{extended:true} is passed as parameter bcoz this body parser in depricated neef to be extended
//extended denotes that url can have large number of keys & values and with wide number of characters (lengthy URL)
app.use(express.urlencoded({ extended: true })); //for our app..its optional

//* 2]
//it treats the provided directory as source of static content (media files html codes etc)
//and can be served from the root(url) of our app
//eg : if my image is in some very nested folder, using this MW, I can access it like localhost:3000/file_name
app.use(express.static("../public"));

//* 3]
//Improved security in http request by adding header files
app.use(helmet());

//* 4]
//logs the informetion about request and responses
//* setting it only in development mode
//*NOTE: We have set NODE_ENV=development for now
// const mode = process.env.NODE_ENV; //this technique returns undefined in Dev mode and true in prod mode
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  console.log("in dev mode");
}

console.log(process.env.NODE_ENV);

//* using config package
console.log("Application name:" + config.get("name"));
console.log("Server mail:" + config.get("mail.host"));

//* Project part
//* GET all genres
app.get("/api/genres", (req, res) => {
  res.send(genres);
});
//*GET specific genre
app.get("/api/genres/:id", (req, res) => {
  const genre = genres.find((genre) => genre.id === +req.params.id);
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
    id: genres.length + 1,
    name: req.body.name,
    description: req.body.description,
  };

  genres.push(genre);
  res.send(genre);
});
//*UPDATE a genre
app.put("/api/genres/:id", (req, res) => {
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
app.delete("/api/genres/:id", (req, res) => {
  const index = genres.findIndex((genre) => genre.id === +req.params.id);
  if (index === -1) {
    res.status(404).send("Genre with provided ID doesn't exist");
    return;
  }
  const genre = genres[index];
  genres.splice(index, 1);
  res.send(genre);
});
//*listen to a port
app.listen(3000);
