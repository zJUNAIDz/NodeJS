const express = require("express");
const app = express();
//*To validate request response
const Joi = require("joi");

//* To parse req.body into json format
app.use(express.json());
//* TO get response from api
app.get("/", (req, res) => {
  res.send("It's Working...");
});
const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];
//* sending response to nested url
app.get("/api/courses", (req, res) => {
  res.send(
    JSON.stringify([
      { id: 1, name: "typescript" },
      { id: 2, name: "Javascript" },
      { id: 3, name: "python" },
    ])
  );
});

//* sending response to parameterized request(url)
app.get("/api/courses/:id/:name/:sortBy?", (req, res) => {
  res.send(req.query);
  // res.send([{ id: req.params.id, name: req.params.name }]);
});

//* sending response
app.get("/api/courses/:id", (req, res) => {
  const course = courses.find(
    (course) => course.id === parseInt(req.params.id)
  );

  //* We can optionally send something in case status 404
  course ? res.send(course) : res.status(404).sendFile(`${__dirname}/doc.html`);
});

const validateCourse = (course) => {
  //* Joi validation
  //*Interface of validation
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(course);
};

//* updating or adding data to an endpoint
app.post("/api/courses", (req, res) => {
  //* Manual validation
  // if (!req.body.name || req.body.name < 3) {
  //   res.status(400);
  // }
  //* using our user defined validation checker function
  const { error } = validateCourse(req.body);
  if (error) {
    // console.log(result.error);
    // res.status(400).send(result.error);
    res.status(400).send(error.details[0].message);
    return;
  }
  const course = { id: courses.length + 1, name: req.body.name };
  courses.push(course);
  res.send(courses);
});

//* To update data..use put method
app.put("/api/courses/:id", (req, res) => {
  //*Look up the course
  //* if not exist, return 404
  const course = courses.find(
    (course) => course.id === parseInt(req.params.id)
  );
  if (!course) {
    res.status(404).sendFile(`${__dirname}/doc.html`);
    return;
  }
  //*Validate
  //* if invalid, return 400
  const { error } = validateCourse(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  //* update data
  course.name = req.body.name;
  res.send(course);
  //*return updated data
  // return course;
});

//* Multiple parameters

app.get("/api/posts/:year/:month/:date", (req, res) => {
  res.send(req.params);
});

//* querystrings
app.get("/api/posts/:year", (req, res) => {
  res.send(req.query);
});

//* Getting dynamically assigned port number
const port = process.env.port || 3000;

app.listen(port, () => {
  //* this callback is called when is listened to this port
  // console.log(`Listening on port ${port}...`);
});
